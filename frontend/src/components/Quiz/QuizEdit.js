import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import "./QuizEdit.css";

const QuizEdit = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await axios.get(`/quizzes/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz details:', error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/questions/quiz/${quizId}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuizDetails();
        fetchQuestions();
    }, [quizId]);

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        let base64Image = '';
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                base64Image = reader.result.split(',')[1];
                submitQuestion(base64Image);
            };
            reader.onerror = error => {
                console.error('Error converting image to base64:', error);
            };
        } else {
            submitQuestion(base64Image);
        }
    };

    const submitQuestion = async (base64Image) => {
        const questionDto = {
            questionText,
            questionType,
            quizId,
            answerOptions,
            correctAnswer,
            isCorrect,
            image: base64Image
        };

        try {
            let endpoint = `/questions/${quizId}/add${questionType}`;
            const response = await axios.post(endpoint, questionDto);
            setQuestions([...questions, response.data]);
            setQuestionText('');
            setAnswerOptions(['', '', '', '']);
            setCorrectAnswer('');
            setIsCorrect([false, false, false, false]);
            setSelectedFile(null);
        } catch (error) {
            console.error(`Error adding ${questionType} question:`, error);
        }
    };



    const handleDeleteQuestion = async (questionId) => {
        try {
            await axios.delete(`/questions/delete/${questionId}`);
            setQuestions(questions.filter(question => question.questionId !== questionId));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div className="quiz-edit-container">
            {quiz && <h1>{quiz.quizTitle}</h1>}
            <form onSubmit={handleAddQuestion} className="question-form">
                <div className="form-group">
                    <label>Select question type</label>
                    <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                        <option value="">Select question type</option>
                        <option value="Text">Text</option>
                        <option value="Single">Single Choice</option>
                        <option value="Multiple">Multiple Choice</option>
                        <option value="Bool">Boolean</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Enter question text</label>
                    <input
                        type="text"
                        placeholder="Enter question text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Attach Image</label>
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </div>
                {(questionType === 'Single' || questionType === 'Multiple') && (
                    <div className="form-group">
                        {answerOptions.map((option, index) => (
                            <div key={index}>
                                <label>Option {index + 1}</label>
                                <input
                                    type="text"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...answerOptions];
                                        newOptions[index] = e.target.value;
                                        setAnswerOptions(newOptions);
                                    }}
                                />
                                {questionType === 'Multiple' && (
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isCorrect[index]}
                                            onChange={(e) => {
                                                const newIsCorrect = [...isCorrect];
                                                newIsCorrect[index] = e.target.checked;
                                                setIsCorrect(newIsCorrect);
                                            }}
                                        />
                                        Correct
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {(questionType === 'Single' || questionType === 'Text') && (
                    <div className="form-group">
                        <label>Correct Answer</label>
                        <input
                            type="text"
                            placeholder="Enter correct answer"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />
                    </div>
                )}
                {questionType === 'Bool' && (
                    <div className="form-group">
                        <label>Correct Answer</label>
                        <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                            <option value="">Select correct answer</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                )}
                <button type="submit">Add Question</button>
            </form>
            <div className="questions-list">
                <h2>Questions</h2>
                <ul>
                    {questions.length === 0 ? (
                        <li>No questions available</li>
                    ) : (
                        questions.map(question => (
                            <li key={question.questionId} className="question-item">
                                <span>{question.questionText}</span>
                                <div className="button-group">
                                    <button onClick={() => handleDeleteQuestion(question.questionId)}>Delete</button>
                                    <button onClick={() => navigate(`/questions/edit/${question.questionId}`)}>Edit</button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default QuizEdit;
