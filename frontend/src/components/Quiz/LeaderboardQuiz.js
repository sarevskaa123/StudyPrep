import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LeaderboardQuiz = () => {
    const { quizId } = useParams();
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboardQuizInfo = async () => {
            try {
                const attemptResponse = await axios.get(`http://localhost:8081/api/user/leaderboard/${quizId}`);
                setLeaderboardInfo(attemptResponse.data);

                const quizResponse = await axios.get(`http://localhost:8081/api/quizzes/leaderboard/${quizId}`);
                setQuizInfo(quizResponse.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardQuizInfo();
    }, [quizId]);

    if (loading) return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
            <Typography variant="h6" component="div" mt={2}>Loading...</Typography>
        </Box>
    );
    if (error) return <div>Error: {error.message}</div>;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {quizInfo.quizTitle}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Subject: {quizInfo.subjectName || 'N/A'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {quizInfo.description}
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Username</TableCell>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Start Time</TableCell>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Finish Time</TableCell>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Final Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardInfo.map((l, index) => (
                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f1f1f1' : 'white' }}>
                                <TableCell align="center">{l.username}</TableCell>
                                <TableCell align="center">{formatDate(l.startTime)}</TableCell>
                                <TableCell align="center">{formatDate(l.finishTime)}</TableCell>
                                <TableCell align="center">{l.finalResult}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ textAlign: 'right', mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    component={Link}
                    to="/leaderboard"
                >
                    Go back
                </Button>
            </Box>
        </Container>
    );
};

export default LeaderboardQuiz;
