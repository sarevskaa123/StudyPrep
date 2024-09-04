import {useParams, useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "../../custom-axios/axios";
import {Box, Button, TextField, Typography, Grid, List, ListItem} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import '@fontsource/roboto-slab';
import DeleteIcon from "@mui/icons-material/Delete";

const QuizInfo = () => {
    const {quizId} = useParams();
    const [quizData, setQuizData] = useState(undefined);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {quiz} = location.state || {};
    const theme = useTheme();

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await axios.get(`/quizzes/${quizId}`);
                setQuizData(response.data);
                const responseComments = await axios.get(`/comment/${quizId}`);
                setComments(responseComments.data);
            } catch (error) {
                setError(error.message || "An error occurred while fetching the quiz.");
            }
        };
        fetchQuizDetails();
    }, [quizId]);

    const handleAddComment = async () => {
        const userId = localStorage.getItem('UserId');
        if (!newComment.trim()) return;

        try {
            const response = await axios.post('/comment', {
                userId,
                quizId,
                commentText: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            setError(error.message || 'Failed to add comment.');
        }
    };

    const handleDeleteComment = async commentId =>{
        await axios.delete(`/comment/delete/${commentId}`)
        setComments(comments.filter(comment => comment.commentId !== commentId));
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!quizData) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={8}>
                <Box sx={{ padding: theme.spacing(4)}}>
                    <Typography variant="h4"
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
                                }}>{quizData.quizTitle}</Typography>
                    <Typography variant="body1"
                                component="div"
                                gutterBottom
                                sx={{
                                    marginTop: 2.5,
                                    fontFamily: 'Roboto Slab, serif',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    marginBottom: theme.spacing(4),
                                    letterSpacing: '0.05em',
                                }}>Subject: {quizData.subject?.subjectName}</Typography>
                    <Typography variant="body2"
                                component="div"
                                gutterBottom
                                sx={{
                                    marginTop: 2.5,
                                    fontFamily: 'Roboto Slab, serif',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    marginBottom: theme.spacing(4),
                                    letterSpacing: '0.05em',
                                }}>Number of questions: {quizData.questions?.length}</Typography>
                    {quiz?.totalTimesRated === 0 ? (
                        <Typography variant="body2"
                                    component="div"
                                    gutterBottom
                                    sx={{
                                        marginTop: 2.5,
                                        fontFamily: 'Roboto Slab, serif',
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        marginBottom: theme.spacing(4),
                                        letterSpacing: '0.05em',
                                        color: "red"
                                    }}>The quiz has not been rated yet</Typography>
                    ) : (
                        <Typography variant="body2"
                                    component="div"
                                    gutterBottom
                                    sx={{
                                        marginTop: 2.5,
                                        fontFamily: 'Roboto Slab, serif',
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        marginBottom: theme.spacing(4),
                                        letterSpacing: '0.05em',
                                    }}>Average rating: {quiz?.averageRating} of 5
                            ({quiz?.totalTimesRated} ratings)</Typography>
                    )}

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, fontFamily: 'Roboto Slab, serif', textAlign: 'center', marginBottom: "20px" }}>
                        Comments
                    </Typography>

                    {comments.length === 0 ? (
                        <Typography variant="body2"
                                    component="div"
                                    gutterBottom
                                    sx={{
                                        marginTop: 2.5,
                                        fontFamily: 'Roboto Slab, serif',
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        marginBottom: theme.spacing(4),
                                        letterSpacing: '0.05em',
                                        color : "red"
                                    }}>There are no comments left for this quiz.</Typography>
                    ) : (
                        <Box sx={{ maxHeight: '150px', overflowY: 'auto' }}>
                            <List sx={{ padding: 0 }}>
                                {comments.map((comment, index) => (
                                    <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing(1, 0) }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Roboto Slab, serif',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.05em',
                                                    paddingLeft: theme.spacing(2),
                                                    minHeight: "40px"
                                                }}
                                            >
                                                • {comment.commentText} ({comment.user.username})
                                            </Typography>
                                        </Box>
                                        {comment.user.userId == localStorage.getItem('UserId') && (
                                            <Button variant="contained" onClick={() => handleDeleteComment(comment.commentId)} sx={{ marginLeft: theme.spacing(2) }}>
                                                <DeleteIcon />
                                                Delete
                                            </Button>
                                        )}
                                    </ListItem>
                                ))}
                            </List>

                        </Box>

                    )}

                    {localStorage.getItem("Userrole") !== null && (<>
                    <Typography variant="h6" component="div" sx={{
                        marginTop: 2.5,
                        fontFamily: 'Roboto Slab, serif',
                        fontWeight: 700,
                        textAlign: 'left',
                        marginBottom: theme.spacing(4),
                        letterSpacing: '0.05em',
                    }}>Add a Comment</Typography>
                    <TextField
                        label="Your Comment"
                        variant="outlined"
                        fullWidth
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: theme.spacing(1) }}>
                    <Button variant="contained" onClick={handleAddComment} sx={{ marginBottom: 2 }}>
                        Submit
                    </Button>
                    </Box>
                    </>)}

                    {/* Go Back Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: theme.spacing(4) }}>
                        <Button variant="contained" onClick={() => navigate(-1)} sx={{ width: '100px' }}>
                            Go Back
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default QuizInfo;
