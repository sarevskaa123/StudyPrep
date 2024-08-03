// src/components/Leaderboard/Leaderboard.js
import React from 'react';
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
    Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Leaderboard = (props) => {
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
                        {props.quizzes.map((q, index) => (
                            <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#f1f1f1' : 'white' }}>
                                <TableCell align="center">{q.quizTitle}</TableCell>
                                <TableCell align="center">{q.subject?.subjectName || 'N/A'}</TableCell>
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
