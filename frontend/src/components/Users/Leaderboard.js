import React, { useEffect, useState } from 'react';
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
    Box,
    CircularProgress,
    Pagination
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import '@fontsource/roboto-slab';

const Leaderboard = () => {
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
    const [itemsPerPage] = useState(10); // Define the number of items per page

    const theme = useTheme();

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

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Calculate the data to be displayed for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaderboardInfo.slice(indexOfFirstItem, indexOfLastItem);

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
                        {currentItems.map((q, index) => (
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

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(leaderboardInfo.length / itemsPerPage)} // Total pages
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default Leaderboard;
