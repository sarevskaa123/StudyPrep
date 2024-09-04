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
    CircularProgress,
    TablePagination
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import '@fontsource/roboto-slab';

const LeaderboardQuiz = () => {
    const { quizId } = useParams();
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);  // state for current page
    const [rowsPerPage, setRowsPerPage] = useState(10);  // state for rows per page

    const theme = useTheme();

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

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
                    {quizInfo.quizTitle}
                </Typography>
                <Typography variant="h5"
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
                    Subject: {quizInfo.subjectName || 'N/A'}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {quizInfo.description}
                </Typography>
            </Box>
            {leaderboardInfo.length === 0 && <Typography variant="h6"
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
                                                             textShadow: `1px 1px 2px red`,
                                                             marginBottom: theme.spacing(4),
                                                             letterSpacing: '0.05em',
                                                             color: 'red'
                                                         }}>There are no attempts for this quiz!</Typography>}
            {leaderboardInfo.length > 0 && (
                <>
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
                                {leaderboardInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l, index) => (
                                    <TableRow key={index} sx={{ backgroundColor: (index + page * rowsPerPage) % 2 === 0 ? '#f1f1f1' : 'white' }}>
                                        <TableCell align="center">{l.username}</TableCell>
                                        <TableCell align="center">{formatDate(l.startTime)}</TableCell>
                                        <TableCell align="center">{formatDate(l.finishTime)}</TableCell>
                                        <TableCell align="center">{l.finalResult}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={leaderboardInfo.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10]}
                    />
                </>
            )}
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
