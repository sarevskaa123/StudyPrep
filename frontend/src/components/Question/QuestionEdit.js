import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import "./QuestionEdit.css";

const QuestionEdit = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState([false, false, false, false]);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const response = await axios.get(`/questions/${questionId}`);
                const question = response.data;
                console.log('Fetched question details:', question);

                setQuestionText(question.questionText);
                setQuestionType(question.questionType);

                if (question.questionType === 'Single' || question.questionType === 'Multiple') {
                    setAnswerOptions([
                        question.answerOption1 || '',
                        question.answerOption2 || '',
                        question.answerOption3 || '',
                        question.answerOption4 || ''
                    ]);
                }

                if (question.questionType === 'Single' || question.questionType === 'Bool' || question.questionType === 'Text') {
                    setCorrectAnswer(question.correctAnswer);
                }

                if (question.questionType === 'Multiple') {
                    setIsCorrect([
                        question.correct1 || false,
                        question.correct2 || false,
                        question.correct3 || false,
                        question.correct4 || false
                    ]);
                }
            } catch (error) {
                console.error('Error fetching question details:', error);
            }
        };

        fetchQuestionDetails();
    }, [questionId]);

    const handleSave = async (e) => {
        e.preventDefault();
        const questionDto = {
            questionText,
            questionType,
            answerOptions,
            correctAnswer,
            isCorrect,
            questionId
        };

        console.log('Saving question with data:', questionDto);

        let endpoint = '';

        switch(questionType) {
            case 'Single':
                endpoint = `/questions/${questionId}/editSingle`;
                break;
            case 'Multiple':
                endpoint = `/questions/${questionId}/editMultiple`;
                break;
            case 'Bool':
                endpoint = `/questions/${questionId}/editBool`;
                break;
            case 'Text':
                endpoint = `/questions/${questionId}/editText`;
                break;
            default:
                console.error('Unknown question type:', questionType);
                return;
        }

        try {
            await axios.put(endpoint, questionDto);
            navigate(-1); // Go back to the previous page
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };


    return (
        <div className="question-edit-container">
            <h1>Edit Question</h1>
            <form onSubmit={handleSave} className="question-form">
                <div className="form-group">
                    <label>Question Text</label>
                    <input
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </div>
                {(questionType === 'Single' || questionType === 'Multiple') && (
                    <div className="form-group">
                        {answerOptions.map((option, index) => (
                            <div key={index}>
                                <label>Option {index + 1}</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...answerOptions];
                                        newOptions[index] = e.target.value;
                                        setAnswerOptions(newOptions);
                                    }}
                                />
                            </div>
                        ))}
                        {questionType === 'Multiple' && (
                            <div className="form-group">
                                {isCorrect.map((correct, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={correct}
                                            onChange={(e) => {
                                                const newIsCorrect = [...isCorrect];
                                                newIsCorrect[index] = e.target.checked;
                                                setIsCorrect(newIsCorrect);
                                            }}
                                        />
                                        Correct
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {(questionType === 'Single' || questionType === 'Text') && (
                    <div className="form-group">
                        <label>Correct Answer</label>
                        <input
                            type="text"
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
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default QuestionEdit;
