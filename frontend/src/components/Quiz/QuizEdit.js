import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Paper, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';

const QuizEdit = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await axios.get(`/quizzes/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz details:', error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/questions/quiz/${quizId}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuizDetails();
        fetchQuestions();
    }, [quizId]);

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImagePreview(null);
        }
    }, [selectedFile]);

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        let base64Image = '';
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                base64Image = reader.result.split(',')[1];
                submitQuestion(base64Image);
            };
            reader.onerror = error => {
                console.error('Error converting image to base64:', error);
            };
        } else {
            submitQuestion(base64Image);
        }
    };

    const submitQuestion = async (base64Image) => {
        const questionDto = {
            questionText,
            questionType,
            quizId,
            answerOptions,
            correctAnswer,
            isCorrect,
            image: base64Image
        };

        try {
            let endpoint = `/questions/${quizId}/add${questionType}`;
            const response = await axios.post(endpoint, questionDto);
            setQuestions([...questions, response.data]);
            setQuestionText('');
            setAnswerOptions(['', '', '', '']);
            setCorrectAnswer('');
            setIsCorrect([false, false, false, false]);
            setSelectedFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error(`Error adding ${questionType} question:`, error);
        }
    };

    const handleDeleteQuestion = async (questionId) => {
        try {
            await axios.delete(`/questions/delete/${questionId}`);
            setQuestions(questions.filter(question => question.questionId !== questionId));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px', padding: '20px' }}>
            {quiz && <Typography variant="h3" gutterBottom>{quiz.quizTitle}</Typography>}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <form onSubmit={handleAddQuestion} className="question-form">
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="question-type-label">Select question type</InputLabel>
                        <Select
                            labelId="question-type-label"
                            id="question-type"
                            value={questionType}
                            label="Select question type"
                            onChange={(e) => setQuestionType(e.target.value)}
                        >
                            <MenuItem value="Text">Text</MenuItem>
                            <MenuItem value="Single">Single Choice</MenuItem>
                            <MenuItem value="Multiple">Multiple Choice</MenuItem>
                            <MenuItem value="Bool">Boolean</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Enter question text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                    <Box mb={2}>
                        <Typography variant="body1" gutterBottom>Attach Image</Typography>
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            style={{ display: 'block' }}
                        />
                        {imagePreview && (
                            <Box mt={2}>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            </Box>
                        )}
                    </Box>
                    {(questionType === 'Single' || questionType === 'Multiple') && (
                        <div>
                            {answerOptions.map((option, index) => (
                                <Box key={index} display="flex" alignItems="center" mb={2}>
                                    <TextField
                                        fullWidth
                                        label={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                            const newOptions = [...answerOptions];
                                            newOptions[index] = e.target.value;
                                            setAnswerOptions(newOptions);
                                        }}
                                    />
                                    {questionType === 'Multiple' && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isCorrect[index]}
                                                    onChange={(e) => {
                                                        const newIsCorrect = [...isCorrect];
                                                        newIsCorrect[index] = e.target.checked;
                                                        setIsCorrect(newIsCorrect);
                                                    }}
                                                />
                                            }
                                            label="Correct"
                                            style={{ marginLeft: '10px' }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </div>
                    )}
                    {(questionType === 'Single' || questionType === 'Text') && (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Correct Answer"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />
                    )}
                    {questionType === 'Bool' && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="correct-answer-label">Correct Answer</InputLabel>
                            <Select
                                labelId="correct-answer-label"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="true">True</MenuItem>
                                <MenuItem value="false">False</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>Add Question</Button>
                </form>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>Questions</Typography>
                <Grid container spacing={2}>
                    {questions.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="body1">No questions available</Typography>
                        </Grid>
                    ) : (
                        questions.map(question => (
                            <Grid item xs={12} key={question.questionId}>
                                <Paper elevation={2} style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1">{question.questionText}</Typography>
                                        <Box>
                                            <Button variant="contained" color="secondary" onClick={() => handleDeleteQuestion(question.questionId)} style={{ marginRight: '10px' }}>Delete</Button>
                                            <Button variant="contained" color="primary" onClick={() => navigate(`/questions/edit/${question.questionId}`)}>Edit</Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
        </Container>
    );
};

export default QuizEdit;
