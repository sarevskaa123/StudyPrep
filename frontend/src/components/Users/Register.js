import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPrepService from "../../repository/StudyPrepRepository";
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import logo from './register.webp';

const Register = (props) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(password);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setErrorMessage("Invalid email address");
            return;
        }

        if (!validatePassword(formData.password)) {
            setErrorMessage("Password must be at least 8 characters long and contain at least one special character");
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        StudyPrepService.register(formData.username, formData.email, formData.password, formData.repeatPassword)
            .then(() => {
                props.onRegister();
                navigate("/"); // Redirect to the home page
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <img src={logo} alt="Logo" style={{ width: '250px', height: '150px' }} />
                </Box>
                <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                    Register
                </Typography>
                {errorMessage && (
                    <Typography variant="body1" color="error" textAlign="center" gutterBottom>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={onFormSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Repeat Password"
                        name="repeatPassword"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
