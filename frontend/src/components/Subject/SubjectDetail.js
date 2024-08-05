// src/components/Subject/SubjectDetail.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import { Container, Typography, TextField, Button, Card, CardContent, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

const SubjectDetail = () => {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [newQuizName, setNewQuizName] = useState('');

    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`/quizzes/subject/${subjectId}/ratings`);
            setQuizzes(response.data || []);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }, [subjectId]);

    const fetchSubject = useCallback(async () => {
        try {
            const response = await axios.get(`/subjects/${subjectId}`);
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
            const endpoint = `/quizzes/${subjectId}/add`;
            const response = await axios.post(endpoint, { quizTitle: newQuizName.trim() });
            setQuizzes([...quizzes, response.data]);
            setNewQuizName('');
            window.location.reload();

        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await axios.delete(`/quizzes/delete/${quizId}`);
            setQuizzes(quizzes.filter(quiz => quiz.quiz.quizId !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="div" gutterBottom>
                {subject ? subject.subjectName : 'Loading...'}
            </Typography>
            { localStorage.getItem("Userrole") === "ADMIN" ? (
            <Box component="form" onSubmit={handleAddQuiz} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    variant="outlined"
                    label="Enter new quiz name"
                    value={newQuizName}
                    onChange={(e) => setNewQuizName(e.target.value)}
                    fullWidth
                    sx={{ mr: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" endIcon={<AddIcon />}>
                    Add Quiz
                </Button>
            </Box>) : (<div></div>)}
            <Box sx={{ display: 'grid', gap: 2 }}>
                {Array.isArray(quizzes) && quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <Card key={quiz.quiz.quizId} variant="outlined">
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">
                                    {quiz.quiz.quizTitle} - ({quiz.averageRating} of 5) {quiz.totalTimesRated} ratings
                                </Typography>
                                <Box>
                                    { localStorage.getItem("Userrole") === "ADMIN" ? (
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQuiz(quiz.quiz.quizId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    ) :(<div></div>)}
                                    { localStorage.getItem("Userrole") === "ADMIN" ? (
                                    <IconButton edge="end" component={Link} to={`/quizzes/edit/${quiz.quiz.quizId}`}>
                                        <EditIcon />
                                    </IconButton>
                                    ) :(<div></div>)}
                                    { localStorage.getItem("UserId") ? (
                                    <IconButton edge="end" component={Link} to={`/quizzes/start/${quiz.quiz.quizId}`}>
                                        <PlayArrowIcon />
                                    </IconButton>
                                    ) :(<div></div>)}
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary">No quizzes available</Typography>
                )}
            </Box>
        </Container>
    );
};

export default SubjectDetail;
