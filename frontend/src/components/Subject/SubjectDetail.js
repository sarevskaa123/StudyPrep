import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "../../custom-axios/axios";

const SubjectDetail = () => {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [newQuizName, setNewQuizName] = useState('');

    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`/quizzes/subject/${subjectId}`); // Ensure this is the correct endpoint
            setQuizzes(response.data || []); // Add a default empty array if response.data is undefined
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }, [subjectId]);

    const fetchSubject = useCallback(async () => {
        try {
            const response = await axios.get(`/subjects/${subjectId}`); // Ensure this is the correct endpoint
            setSubject(response.data);
        } catch (error) {
            console.error('Error fetching subject details:', error);
        }
    }, [subjectId]);

    useEffect(() => {
        if (subjectId) {
            fetchSubject();
            fetchQuizzes();
        }
    }, [subjectId, fetchSubject, fetchQuizzes]);

    const handleAddQuiz = async (e) => {
        e.preventDefault();
        try {
            const endpoint = `/quizzes/${subjectId}/add`; // Ensure this is the correct endpoint
            console.log("addQuizToSubject endpoint:", endpoint);
            const response = await axios.post(endpoint, {
                quizTitle: newQuizName.trim()
            });
            setQuizzes([...quizzes, response.data]);
            setNewQuizName('');
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await axios.delete(`/quizzes/delete/${quizId}`); // Ensure this is the correct endpoint
            setQuizzes(quizzes.filter(quiz => quiz.quizId !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div>
            {subject ? <h1>{subject.subjectName}</h1> : <h1>Loading...</h1>}
            <form onSubmit={handleAddQuiz}>
                <input
                    type="text"
                    placeholder="Enter new quiz name"
                    value={newQuizName}
                    onChange={(e) => setNewQuizName(e.target.value)}
                />
                <button type="submit">Add Quiz</button>
            </form>
            <ul>
                {Array.isArray(quizzes) && quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <li key={quiz.quizId}>
                            {quiz.quizTitle}
                            <button onClick={() => handleDeleteQuiz(quiz.quizId)}>Delete</button>
                            <Link to={`/quizzes/edit/${quiz.quizId}`}>
                                <button>Edit</button>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No quizzes available</li>
                )}
            </ul>
        </div>
    );
};

export default SubjectDetail;
