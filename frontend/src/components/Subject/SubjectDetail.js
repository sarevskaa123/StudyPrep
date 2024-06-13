import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../custom-axios/axios";

const SubjectDetail = ({ fetchSubjectDetails, addQuizToSubject}) => {
    const { subjectId } = useParams();
    const [subject] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [newQuizName, setNewQuizName] = useState('');


    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`/quizzes/subject/${subjectId}`);
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }, [subjectId]);

    useEffect(() => {
        if (subjectId) {
            fetchQuizzes();
        }
    }, [subjectId, fetchQuizzes]);

    const handleAddQuiz = async (e) => {
        e.preventDefault();
        try {
            const endpoint = `/quizzes/${subjectId}/add`;
            console.log("addQuizToSubject endpoint:", endpoint); // Log the endpoint
            const response = await axios.post(endpoint, {
                quizTitle: newQuizName.trim()
            });
            setQuizzes([...quizzes, response.data]);
            setNewQuizName('');
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    // const handleDeleteQuiz = async (quizId) => {
    //     await deleteQuizFromSubject(quizId);
    //     setQuizzes(quizzes.filter(quiz => quiz.quizId !== quizId));
    // };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await axios.delete(`/quizzes/delete/${quizId}`);
            setQuizzes(quizzes.filter(quiz => quiz.quizId !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };


    return (
        <div>
            {subject && <h1>{subject.subjectName}</h1>}
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
                {quizzes.map((quiz) => (
                    <li key={quiz.quizId}>
                        {quiz.quizTitle}
                        <button onClick={() => handleDeleteQuiz(quiz.quizId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubjectDetail;
