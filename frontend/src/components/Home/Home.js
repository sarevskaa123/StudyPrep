// src/components/Home/Home.js
import React from 'react';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import welcomeImage from './welcome.jpg';

const Home = () => {

    const authenticate = localStorage.getItem("Username") ? (
        <Box mt={2}>
            <Button variant="contained" color="primary" component={Link} to="/subjects">
                Start Quizzing
            </Button>
        </Box>
    ) : (
        <Box mt={2}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Start Quizzing
            </Button>
        </Box>
    );

    return (
        <Container maxWidth="md">
            <Card>
                <CardMedia
                    component="img"
                    alt="Welcome to Study Prep"
                    height="300"
                    image={welcomeImage} // Make sure the path to your image is correct
                    title="Welcome to Study Prep"
                />
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Welcome to Study Prep
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Study Prep is a quiz app for solving quizzes related to FINKI subjects. Enjoy and learn!
                    </Typography>
                    {authenticate}
                </CardContent>
            </Card>
        </Container>
    );
}

export default Home;
