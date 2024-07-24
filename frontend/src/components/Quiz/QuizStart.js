import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";

const QuizStart = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [subjectId, setSubjectId] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false); // New state to track quiz completion
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/questions/quiz/random/${quizId}?count=10`);
                setQuestions(response.data);
                setStartTime(new Date());

                const quizResponse = await axios.get(`http://localhost:8081/api/quizzes/${quizId}`);
                setSubjectId(quizResponse.data.subjectId.subjectId);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    useEffect(() => {
        if (quizFinished) {
            saveAttempt();
        }
    }, [score, quizFinished]); // Run saveAttempt when score or quizFinished changes

    const handleAnswerSelect = (index, isChecked) => {
        const updatedSelectedAnswer = [...selectedAnswer];
        updatedSelectedAnswer[index] = isChecked;
        setSelectedAnswer(updatedSelectedAnswer);
    };

    const handleAnswerSubmit = (moveNext = true) => {
        const currentQuestion = questions[currentQuestionIndex];
        let isCorrect;
        let correctAnswer;

        if (currentQuestion.questionType === 'Multiple') {
            const correctAnswers = [currentQuestion.correct1, currentQuestion.correct2, currentQuestion.correct3, currentQuestion.correct4];
            const userSelectedAnswers = selectedAnswer.map((selected, index) => selected ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean);
            const correctAnswerOptions = correctAnswers.map((correct, index) => correct ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean);
            isCorrect = correctAnswerOptions.length === userSelectedAnswers.length &&
                correctAnswerOptions.every((answer) => userSelectedAnswers.includes(answer));

            correctAnswer = correctAnswerOptions.join(', ');
        } else if (currentQuestion.questionType === 'Bool') {
            const correctAnswerText = currentQuestion.correctAnswer.toString().toLowerCase();
            isCorrect = selectedAnswer[0]?.toLowerCase() === correctAnswerText;
            correctAnswer = correctAnswerText === 'true' ? 'True' : 'False';
        } else {
            isCorrect = selectedAnswer[0] === currentQuestion.correctAnswer;
            correctAnswer = currentQuestion.correctAnswer;
        }

        const userAnswerText = currentQuestion.questionType === 'Multiple'
            ? selectedAnswer.map((selected, index) => selected ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean).join(', ')
            : selectedAnswer[0];

        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = { question: currentQuestion, isCorrect, userAnswer: userAnswerText, correctAnswer };
        setUserAnswers(updatedUserAnswers);

        if (isCorrect) {
            setScore(prevScore => prevScore + 1); // Update score correctly
        }

        if (moveNext) {
            handleNextQuestion();
        } else {
            handlePreviousQuestion();
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const nextQuestion = questions[currentQuestionIndex + 1];
            const nextAnswers = userAnswers[currentQuestionIndex + 1]?.userAnswer.split(', ') || [];
            if (nextQuestion) {
                setSelectedAnswer(nextQuestion.questionType === 'Multiple'
                    ? nextAnswers.map(answer => nextQuestion.answerOptions?.includes(answer))
                    : nextAnswers);
            }
        } else {
            setEndTime(new Date());
            setShowResults(true);
            setQuizFinished(true); // Mark the quiz as finished
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const previousQuestion = questions[currentQuestionIndex - 1];
            const previousAnswers = userAnswers[currentQuestionIndex - 1]?.userAnswer.split(', ') || [];
            if (previousQuestion) {
                setSelectedAnswer(previousQuestion.questionType === 'Multiple'
                    ? previousAnswers.map(answer => previousQuestion.answerOptions?.includes(answer))
                    : previousAnswers);
            }
        }
    };

    const saveAttempt = async () => {
        const userId = localStorage.getItem('UserId'); // Get the user ID from local storage
        const attemptData = {
            startTime,
            finishTime: new Date(),
            finalResult: score,
            user: { userId: userId }, // Use the stored user ID
            quiz: { quizId: quizId }
        };

        try {
            await axios.post('http://localhost:8081/api/user/attempts', attemptData);
        } catch (error) {
            console.error('Error saving attempt:', error);
        }
    };

    const handleQuitQuiz = () => {
        if (subjectId) {
            navigate(`/subjects/${subjectId}`);
        } else {
            navigate('/'); // Fallback in case subjectId is not available
        }
    };

    if (showResults) {
        const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
        const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect);

        return (
            <div>
                <h1>Quiz Results</h1>
                <p>Score: {score} / {questions.length}</p>
                <p>Time Taken: {timeTaken.toFixed(2)} seconds</p>
                <h2>Incorrect Answers</h2>
                {incorrectAnswers.length === 0 ? (
                    <p>There are no incorrect answers. Great job!</p>
                ) : (
                    <ul>
                        {incorrectAnswers.map((answer, index) => (
                            <li key={index}>
                                <p><strong>Question:</strong> {answer.question.questionText}</p>
                                <p><strong>Your Answer:</strong> {Array.isArray(answer.userAnswer) ? answer.userAnswer.filter(Boolean).join(', ') : answer.userAnswer}</p>
                                <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const { questionText, questionType, answerOption1, answerOption2, answerOption3, answerOption4 } = currentQuestion;
    const answerOptions = [answerOption1, answerOption2, answerOption3, answerOption4].filter(option => option !== undefined && option !== null && option !== '');

    const renderQuestion = () => {
        switch (questionType) {
            case 'Multiple':
                return (
                    <div>
                        <p>{questionText}</p>
                        {answerOptions.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    checked={!!selectedAnswer[index]}
                                    onChange={(e) => handleAnswerSelect(index, e.target.checked)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                        {currentQuestionIndex > 0 && <button onClick={() => handleAnswerSubmit(false)}>Previous</button>}
                        <button onClick={() => handleAnswerSubmit(true)}>Next</button>
                    </div>
                );
            case 'Single':
                return (
                    <div>
                        <p>{questionText}</p>
                        {answerOptions.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name="singleChoice"
                                    value={option}
                                    onChange={() => setSelectedAnswer([option])}
                                    checked={selectedAnswer.includes(option)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                        {currentQuestionIndex > 0 && <button onClick={() => handleAnswerSubmit(false)}>Previous</button>}
                        <button onClick={() => handleAnswerSubmit(true)}>Next</button>
                    </div>
                );
            case 'Bool':
                return (
                    <div>
                        <p>{questionText}</p>
                        <div>
                            <input
                                type="radio"
                                name="boolChoice"
                                value="true"
                                onChange={() => setSelectedAnswer(['true'])}
                                checked={selectedAnswer.includes('true')}
                            />
                            <label>True</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="boolChoice"
                                value="false"
                                onChange={() => setSelectedAnswer(['false'])}
                                checked={selectedAnswer.includes('false')}
                            />
                            <label>False</label>
                        </div>
                        {currentQuestionIndex > 0 && <button onClick={() => handleAnswerSubmit(false)}>Previous</button>}
                        <button onClick={() => handleAnswerSubmit(true)}>Next</button>
                    </div>
                );
            case 'Text':
                return (
                    <div>
                        <p>{questionText}</p>
                        <input
                            type="text"
                            value={selectedAnswer[0] || ''}
                            onChange={(e) => setSelectedAnswer([e.target.value])}
                        />
                        {currentQuestionIndex > 0 && <button onClick={() => handleAnswerSubmit(false)}>Previous</button>}
                        <button onClick={() => handleAnswerSubmit(true)}>Next</button>
                    </div>
                );
            default:
                return <p>Unknown question type</p>;
        }
    };

    return (
        <div>
            <h1>Question {currentQuestionIndex + 1}</h1>
            {renderQuestion()}
            <button onClick={handleQuitQuiz} style={{ color: 'white', backgroundColor: 'red', marginTop: '10px' }}>Quit Quiz</button>
        </div>
    );
};

export default QuizStart;
