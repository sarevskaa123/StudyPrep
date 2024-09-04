import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import { Container, Typography, TextField, Button, Card, CardContent, IconButton, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import '@fontsource/roboto-slab';

const SubjectDetail = () => {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [newQuizName, setNewQuizName] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const theme = useTheme();

    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`/quizzes/subject/${subjectId}/ratings`);
            setQuizzes(response.data || []);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);
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

    const handleClickToQuizInfo = quiz => {
        // Navigate to the quiz info route and pass the quiz data
        navigate(`/quizzes/info/${quiz.quizId}`, { state: { quiz } });
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
            <Typography variant="h3"
                        component="div"
                        gutterBottom
                        sx={{
                            marginTop: 2.5,
                            fontFamily: 'Roboto Slab, serif',
                            fontWeight: 700,
                            textAlign: 'center',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `1px 1px 2px ${theme.palette.primary.dark}`,
                            marginBottom: theme.spacing(4),
                            letterSpacing: '0.05em',
                        }}>
                {subject ? subject.subjectName : <CircularProgress />}
            </Typography>
            {localStorage.getItem("Userrole") === "ADMIN" ? (
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
                </Box>
            ) : (<div></div>)}
            <Box sx={{ display: 'grid', gap: 2 }}>
                {loading ? (
                    <CircularProgress />
                ) : Array.isArray(quizzes) && quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <Card
                            key={quiz.quizId}
                            variant="outlined"
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                textDecoration: 'none',
                                color: 'inherit',
                                backgroundImage: index % 2 === 0
                                    ? `linear-gradient(to left, ${theme.palette.background.default}, ${theme.palette.action.hover})`
                                    : `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.action.hover})`,
                                transition: 'background-color 0.5s ease', // Slower transition
                                '&:hover::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(to right, ${theme.palette.action.hover} 50%, transparent 100%)`, // Lighter color
                                    opacity: 0.9, // More visible hover effect
                                    transition: 'opacity 0.5s ease-in-out', // Slower transition
                                },
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                }
                            }}
                        >
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {quiz.totalTimesRated === 0 ? (
                                    <Typography variant="h6">{quiz.quizTitle} - 0 ratings</Typography>
                                ) : (
                                    <Typography variant="h6">
                                        {quiz.quizTitle} - ({quiz.averageRating} of 5) {quiz.totalTimesRated} ratings
                                    </Typography>
                                )}
                                <Box>
                                    <IconButton edge="end" onClick={() => handleClickToQuizInfo(quiz)} sx={{ ml: 0.25 }}>
                                        <InfoIcon />
                                    </IconButton>
                                    {localStorage.getItem("Userrole") === "ADMIN" ? (
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQuiz(quiz.quizId)} sx={{ mr: 0.25 }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    ) : (<div></div>)}
                                    {localStorage.getItem("Userrole") === "ADMIN" ? (
                                        <IconButton edge="end" component={Link} to={`/quizzes/edit/${quiz.quizId}`} sx={{ mx: 0.25 }}>
                                            <EditIcon />
                                        </IconButton>
                                    ) : (<div></div>)}
                                    {localStorage.getItem("UserId") ? (
                                        <IconButton edge="end" component={Link} to={`/quizzes/start/${quiz.quizId}`} sx={{ ml: 0.25 }}>
                                            <PlayArrowIcon />
                                        </IconButton>
                                    ) : (<div></div>)}
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <CircularProgress />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: '100px' }}>
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SubjectDetail;
