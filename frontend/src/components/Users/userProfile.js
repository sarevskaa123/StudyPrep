import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    Box,
    Card,
    CardContent,
    Divider,
    CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '@fontsource/roboto-slab';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = useTheme();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('UserId');
                const response = await axios.get(`http://localhost:8081/api/user/${userId}`);
                setUserInfo(response.data);
                console.log('Received userInfo:', response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
                <Typography variant="h6" component="div" mt={2}>Loading...</Typography>
            </Box>
        );
    }
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography  variant="h3"
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
                    User Information
                </Typography>
                {userInfo?.username && (
                    <Card variant="outlined" sx={{ mb: 4, backgroundColor: '#f9f9f9' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6">Email:</Typography>
                                    <Typography variant="body1">{userInfo?.email}</Typography>
                                </Box>
                                <Divider sx={{ my: 1, borderBottomWidth: 2, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6">Register Date:</Typography>
                                    <Typography variant="body1">{new Date(userInfo?.registerDate).toLocaleString()}</Typography>
                                </Box>
                                <Divider sx={{ my: 1, borderBottomWidth: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6">Username:</Typography>
                                    <Typography variant="body1">{userInfo?.username}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                )}
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
                    All attempts for user {userInfo?.username}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Quiz Title</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Subject</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Start Time</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Finish Time</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#3f51b5', color: 'white' }}>Total Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userInfo.attempts && userInfo.attempts.length > 0 ? (
                                userInfo.attempts.map(attempt => (
                                    <TableRow key={attempt.attemptId} sx={{ backgroundColor: '#f1f1f1' }}>
                                        <TableCell align="center">
                                            <Link to={`/attempt/${attempt.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {attempt.quizTitle || 'N/A'}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{attempt.subjectName || 'N/A'}</TableCell>
                                        <TableCell align="center">{attempt.startTime ? new Date(attempt.startTime).toLocaleString() : 'N/A'}</TableCell>
                                        <TableCell align="center">{attempt.finishTime ? new Date(attempt.finishTime).toLocaleString() : 'N/A'}</TableCell>
                                        <TableCell align="center">{attempt.finalResult}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5" align="center">No attempts found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default UserInfo;
