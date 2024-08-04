import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Form} from 'react-router-dom';
import axios from "../../custom-axios/axios";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Container,
    Box,
    CircularProgress,
    Paper,
    Grid,
    Alert,
    MenuItem
} from '@mui/material';

const QuizStart = () => {
    const {quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [subjectId, setSubjectId] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);
    const navigate = useNavigate();
    const [rating, setRating] = useState(false);
    const [ratingScore, setRatingScore] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/questions/quiz/random/${quizId}?count=10`);
                setQuestions(response.data);
                setStartTime(new Date());

                const ratingResponse = await axios.get(`/rating/${quizId}/${localStorage.getItem("UserId")}`);
                setRating(ratingResponse.data)
                console.log(ratingResponse.data)

                const quizResponse = await axios.get(`/api/quizzes/${quizId}`);
                setSubjectId(quizResponse.data.subjectId.subjectId);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    useEffect(() => {
        if (quizFinished) {
            saveAttempt();
        }
    }, [score, quizFinished]);

    const handleAnswerSelect = (index, isChecked) => {
        const updatedSelectedAnswer = [...selectedAnswer];
        updatedSelectedAnswer[index] = isChecked;
        setSelectedAnswer(updatedSelectedAnswer);
    };

    const handleAnswerSubmit = (moveNext = true) => {
        const currentQuestion = questions[currentQuestionIndex];
        let isCorrect;
        let correctAnswer;

        if (currentQuestion.questionType === 'Multiple') {
            const correctAnswers = [currentQuestion.correct1, currentQuestion.correct2, currentQuestion.correct3, currentQuestion.correct4];
            const userSelectedAnswers = selectedAnswer.map((selected, index) => selected ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean);
            const correctAnswerOptions = correctAnswers.map((correct, index) => correct ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean);
            isCorrect = correctAnswerOptions.length === userSelectedAnswers.length &&
                correctAnswerOptions.every((answer) => userSelectedAnswers.includes(answer));

            correctAnswer = correctAnswerOptions.join(', ');
        } else if (currentQuestion.questionType === 'Bool') {
            isCorrect = selectedAnswer[0]?.toLowerCase() === currentQuestion.correctAnswer.toString().toLowerCase();
            correctAnswer = currentQuestion.correctAnswer ? 'True' : 'False';
        } else {
            isCorrect = selectedAnswer[0] === currentQuestion.correctAnswer;
            correctAnswer = currentQuestion.correctAnswer;
        }

        const userAnswerText = currentQuestion.questionType === 'Multiple'
            ? selectedAnswer.map((selected, index) => selected ? currentQuestion[`answerOption${index + 1}`] : null).filter(Boolean).join(', ')
            : selectedAnswer[0];

        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = {
            question: currentQuestion,
            isCorrect,
            userAnswer: userAnswerText,
            correctAnswer,
            selectedAnswer
        };
        setUserAnswers(updatedUserAnswers);

        if (!userAnswers[currentQuestionIndex]) {
            if (isCorrect) {
                setScore(prevScore => prevScore + 1);
            }
        } else if (userAnswers[currentQuestionIndex].isCorrect !== isCorrect) {
            if (isCorrect) {
                setScore(prevScore => prevScore + 1);
            } else {
                setScore(prevScore => prevScore - 1);
            }
        }

        if (moveNext) {
            handleNextQuestion();
        } else {
            handlePreviousQuestion();
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const nextAnswers = userAnswers[currentQuestionIndex + 1]?.selectedAnswer || [];
            setSelectedAnswer(nextAnswers);
        } else {
            setEndTime(new Date());
            setShowResults(true);
            setQuizFinished(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const previousAnswers = userAnswers[currentQuestionIndex - 1]?.selectedAnswer || [];
            setSelectedAnswer(previousAnswers);
        }
    };

    const saveAttempt = async () => {
        const userId = localStorage.getItem('UserId'); // Get the user ID from local storage
        const questionAttempts = userAnswers.map((answer) => {
            return {
                questionId: answer.question.questionId,
                userAnswers: answer.userAnswer ? answer.userAnswer.split(',').map(part => part.trim()) : [],
                isCorrect: answer.isCorrect,
                points: answer.isCorrect ? 1 : 0
            };
        });
        const attemptData = {
            startTime,
            finishTime: new Date(),
            finalResult: score,
            user: {userId: userId}, // Use the stored user ID
            quiz: {quizId: quizId},
            historyQuiz: questionAttempts
        };

        try {
            await axios.post('http://localhost:8081/api/user/attempts', attemptData);
        } catch (error) {
            console.error('Error saving attempt:', error);
        }
    };

    const handleQuitQuiz = () => {
        if (subjectId) {
            navigate(`/subjects/${subjectId}`);
        } else {
            navigate('/');
        }
    };

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        if (ratingScore < 1 || ratingScore > 5) {
            setError('Rating must be between 1 and 5.');
            return;
        }

        const rating = {
            ratingScore,
            userId: localStorage.getItem("UserId") ,
            quizId: quizId
        };

        try {
            await axios.post('/rating', rating);
            setSuccess('Rating submitted successfully');
            setError('');
            navigate('/')
        } catch (error) {
            setError('Error submitting rating. Please try again.');
            setSuccess('');
        }
    };


    if (showResults) {
        const timeTaken = (endTime - startTime) / 1000;
        const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect);

        return (
            <Container>
                <Typography variant="h3" gutterBottom style={{fontWeight: 'bold', color: '#3f51b5'}}>Quiz
                    Results</Typography>
                <Typography variant="h5" gutterBottom
                            style={{color: '#4caf50'}}>Score: {score} / {questions.length}</Typography>
                <Typography variant="h5" gutterBottom style={{color: '#ff9800'}}>Time
                    Taken: {timeTaken.toFixed(2)} seconds</Typography>
                <Typography variant="h4" gutterBottom style={{color: '#f44336'}}>Incorrect Answers</Typography>
                {incorrectAnswers.length === 0 ? (
                    <Typography variant="body1">There are no incorrect answers. Great job!</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {incorrectAnswers.map((answer, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={3} style={{padding: '10px', backgroundColor: '#f8f9fa'}}>
                                    <Typography
                                        variant="body1"><strong>Question:</strong> {answer.question.questionText}
                                    </Typography>
                                    <Box mt={2}>
                                        <Typography variant="body2" style={{color: 'red'}}><strong>Your
                                            Answer:</strong> {answer.userAnswer}</Typography>
                                        <Typography variant="body2" style={{color: 'green'}}><strong>Correct
                                            Answer:</strong> {answer.correctAnswer}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
                {rating === true ? (
                        <Container maxWidth="sm">
                            <Typography variant="h5" gutterBottom>
                                Rate this Quiz
                            </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}
                            <Box component="form" onSubmit={handleSubmitRating} sx={{ mt: 2 }}>
                                <TextField
                                    select
                                    label="Rating"
                                    value={ratingScore}
                                    onChange={(e) => setRatingScore(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit Rating
                                </Button>
                            </Box>
                        </Container>
                        )
                    : (
                        <Typography variant="body1">You have already left a rating.</Typography>
                    )}
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>Back to Home</Button>
            </Container>
        );
    }

    if (questions.length === 0) {
        return (
            <Container>
                <CircularProgress/>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const {
        questionText,
        questionType,
        answerOption1,
        answerOption2,
        answerOption3,
        answerOption4,
        image
    } = currentQuestion;
    const answerOptions = [answerOption1, answerOption2, answerOption3, answerOption4].filter(option => option !== undefined && option !== null && option !== '');

    const renderQuestion = () => {
        const imageSrc = image && image.length > 0 ? `data:image/jpeg;base64,${image}` : null;

        switch (questionType) {
            case 'Multiple':
                return (
                    <Box>
                        <Typography variant="h6">{questionText}</Typography>
                        {imageSrc && <img src={imageSrc} alt="question" style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '10px'
                        }}/>}
                        {answerOptions.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox checked={!!selectedAnswer[index]}
                                                   onChange={(e) => handleAnswerSelect(index, e.target.checked)}/>}
                                label={option}
                            />
                        ))}
                        <Box mt={2}>
                            {currentQuestionIndex > 0 && <Button variant="contained" color="secondary"
                                                                 onClick={() => handleAnswerSubmit(false)}>Previous</Button>}
                            <Button variant="contained" color="primary"
                                    onClick={() => handleAnswerSubmit(true)}>Next</Button>
                        </Box>
                    </Box>
                );
            case 'Single':
                return (
                    <Box>
                        <Typography variant="h6">{questionText}</Typography>
                        {imageSrc && <img src={imageSrc} alt="question" style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '10px'
                        }}/>}
                        <RadioGroup value={selectedAnswer[0]} onChange={(e) => setSelectedAnswer([e.target.value])}>
                            {answerOptions.map((option, index) => (
                                <FormControlLabel key={index} value={option} control={<Radio/>} label={option}/>
                            ))}
                        </RadioGroup>
                        <Box mt={2}>
                            {currentQuestionIndex > 0 && <Button variant="contained" color="secondary"
                                                                 onClick={() => handleAnswerSubmit(false)}>Previous</Button>}
                            <Button variant="contained" color="primary"
                                    onClick={() => handleAnswerSubmit(true)}>Next</Button>
                        </Box>
                    </Box>
                );
            case 'Bool':
                return (
                    <Box>
                        <Typography variant="h6">{questionText}</Typography>
                        {imageSrc && <img src={imageSrc} alt="question" style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '10px'
                        }}/>}
                        <RadioGroup value={selectedAnswer[0]} onChange={(e) => setSelectedAnswer([e.target.value])}>
                            <FormControlLabel value="true" control={<Radio/>} label="True"/>
                            <FormControlLabel value="false" control={<Radio/>} label="False"/>
                        </RadioGroup>
                        <Box mt={2}>
                            {currentQuestionIndex > 0 && <Button variant="contained" color="secondary"
                                                                 onClick={() => handleAnswerSubmit(false)}>Previous</Button>}
                            <Button variant="contained" color="primary"
                                    onClick={() => handleAnswerSubmit(true)}>Next</Button>
                        </Box>
                    </Box>
                );
            case 'Text':
                return (
                    <Box>
                        <Typography variant="h6">{questionText}</Typography>
                        {imageSrc && <img src={imageSrc} alt="question" style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            width: 'auto',
                            height: 'auto',
                            marginBottom: '10px'
                        }}/>}
                        <TextField
                            label="Your Answer"
                            variant="outlined"
                            fullWidth
                            value={selectedAnswer[0] || ''}
                            onChange={(e) => setSelectedAnswer([e.target.value])}
                        />
                        <Box mt={2}>
                            {currentQuestionIndex > 0 && <Button variant="contained" color="secondary"
                                                                 onClick={() => handleAnswerSubmit(false)}>Previous</Button>}
                            <Button variant="contained" color="primary"
                                    onClick={() => handleAnswerSubmit(true)}>Next</Button>
                        </Box>
                    </Box>
                );
            default:
                return <Typography variant="body1">Unknown question type</Typography>;
        }
    };

    return (
        <Container component={Paper} style={{padding: '20px', marginTop: '20px'}}>
            <Typography variant="h4" gutterBottom>Question {currentQuestionIndex + 1}</Typography>
            {renderQuestion()}
            <Button variant="contained" color="error" onClick={handleQuitQuiz} style={{marginTop: '20px'}}>Quit
                Quiz</Button>
        </Container>
    );
};

export default QuizStart;
