import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttemptDetails = () => {
    const { attemptId } = useParams();
    const [attemptDetails, setAttemptDetails] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttemptDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/user/attempt/${attemptId}`);
                console.log("Response data:", response.data);  // Log the response data

                if (response.data && response.data.questions) {
                    setAttemptDetails(response.data.questions);
                    const { quizId, startTime, finishTime, subjectName, quizName, maxPoints, finalResult} = response.data;
                    setQuizInfo(prevState => ({
                        ...prevState,
                        quizId,
                        startTime,
                        finishTime,
                        subjectName,
                        quizName,
                        maxPoints,
                        finalResult
                    }));
                } else {
                    throw new Error("Invalid response structure for attempt details");
                }
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttemptDetails();
    }, [attemptId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateDuration = (start, finish) => {
        const startTime = new Date(start);
        const finishTime = new Date(finish);
        const duration = (finishTime - startTime) / 1000;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes} minutes and ${seconds} seconds`;
    };

    return (
        <div>
            <h1>Attempt Details</h1>
            {quizInfo && (
                <div>
                    <h2>Quiz Name: {quizInfo.quizName || "N/A"}</h2>
                    <h2>Subject: {quizInfo.subjectName || "N/A"}</h2>
                    <h3>Score: {quizInfo.finalResult} / {quizInfo.maxPoints}</h3>
                    <h4>Date: {quizInfo.startTime ? formatDate(quizInfo.startTime) : "Invalid Date"}</h4>
                    <h4>Duration: {quizInfo.startTime && quizInfo.finishTime ? calculateDuration(quizInfo.startTime, quizInfo.finishTime) : "NaN minutes and NaN seconds"}</h4>
                </div>
            )}
            {attemptDetails.length === 0 ? (
                <p>No details found for this attempt</p>
            ) : (
                attemptDetails.map((question, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p><strong>Question {index + 1}:</strong> {question.questionText}</p>
                        {question.image && <img src={`data:image/jpeg;base64,${question.image}`} alt="question" style={{ maxWidth: '100%', marginBottom: '10px' }} />}
                        <p style={{ color: question.correct ? 'green' : 'red' }}>
                            <strong>Your Answer:</strong> {question.userAnswers.join(', ')}
                        </p>
                        <p><strong>Correct Answer:</strong> {question.correctAnswer.join(', ')}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default AttemptDetails;
