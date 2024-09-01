// src/components/Leaderboard/Leaderboard.js
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
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
    Box, CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";

const Leaderboard = () => {
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboardInfo = async () => {
            try {
                const quizResponse = await axios.get(`http://localhost:8081/api/quizzes/leaderboard`);
                setLeaderboardInfo(quizResponse.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardInfo();
    }, []);

    if (loading) return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
            <Typography variant="h6" component="div" mt={2}>Loading...</Typography>
        </Box>
    );
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Leaderboards for all quizzes
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Quiz Title</TableCell>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Subject</TableCell>
                            <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardInfo.map((q, index) => (
                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f1f1f1' : 'white' }}>
                                <TableCell align="center">{q.quizTitle}</TableCell>
                                <TableCell align="center">{q?.subjectName || 'N/A'}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<VisibilityIcon />}
                                        component={Link}
                                        to={`/leaderboardQuiz/${q.quizId}`}
                                    >
                                        See leaderboard
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Leaderboard;
