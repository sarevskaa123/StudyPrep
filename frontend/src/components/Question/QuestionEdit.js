import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../custom-axios/axios";
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Paper, Box, FormControlLabel, Checkbox } from '@mui/material';

const QuestionEdit = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const response = await axios.get(`/questions/${questionId}`);
                const question = response.data;
                console.log('Fetched question details:', question);

                setQuestionText(question.questionText);
                setQuestionType(question.questionType);

                if (question.image) {
                    setCurrentImage(`data:image/jpeg;base64,${question.image}`);
                }

                if (question.questionType === 'Single' || question.questionType === 'Multiple') {
                    setAnswerOptions([
                        question.answerOption1 || '',
                        question.answerOption2 || '',
                        question.answerOption3 || '',
                        question.answerOption4 || ''
                    ]);
                }

                if (question.questionType === 'Single' || question.questionType === 'Bool' || question.questionType === 'Text') {
                    setCorrectAnswer(question.correctAnswer);
                }

                if (question.questionType === 'Multiple') {
                    setIsCorrect([
                        question.correct1 || false,
                        question.correct2 || false,
                        question.correct3 || false,
                        question.correct4 || false
                    ]);
                }
            } catch (error) {
                console.error('Error fetching question details:', error);
            }
        };

        fetchQuestionDetails();
    }, [questionId]);

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

    const handleSave = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                submitQuestion(base64Image);
            };
            reader.onerror = error => {
                console.error('Error converting image to base64:', error);
            };
        } else {
            submitQuestion(currentImage ? currentImage.split(',')[1] : undefined);
        }
    };

    const submitQuestion = async (base64Image) => {
        const questionDto = {
            questionText,
            questionType,
            answerOptions,
            correctAnswer,
            isCorrect,
            questionId,
            image: base64Image
        };

        console.log('Saving question with data:', questionDto);

        let endpoint = '';

        switch(questionType) {
            case 'Single':
                endpoint = `/questions/${questionId}/editSingle`;
                break;
            case 'Multiple':
                endpoint = `/questions/${questionId}/editMultiple`;
                break;
            case 'Bool':
                endpoint = `/questions/${questionId}/editBool`;
                break;
            case 'Text':
                endpoint = `/questions/${questionId}/editText`;
                break;
            default:
                console.error('Unknown question type:', questionType);
                return;
        }

        try {
            await axios.put(endpoint, questionDto);
            navigate(-1);
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h3" gutterBottom>Edit Question</Typography>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <form onSubmit={handleSave} className="question-form">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Question Text"
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
                                <Typography variant="body2" gutterBottom>Image Preview:</Typography>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                            </Box>
                        )}
                        {currentImage && !selectedFile && (
                            <Box mt={2}>
                                <Typography variant="body2" gutterBottom>Current Image:</Typography>
                                <img src={currentImage} alt="Current question" style={{ maxWidth: '100%', maxHeight: '300px' }} />
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
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>Save</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default QuestionEdit;
