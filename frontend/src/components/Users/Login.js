import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudyPrepService from "../../repository/StudyPrepRepository";
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import logo from './login.png'; // Ensure this path is correct

const Login = (props) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        StudyPrepService.login(formData.username, formData.password)
            .then(resp => {
                console.log(resp.data);
                localStorage.setItem("UserId", resp.data.userId);
                localStorage.setItem("Username", resp.data.username);
                localStorage.setItem("Email", resp.data.email);
                localStorage.setItem("Userrole", resp.data.userRole);
                props.onLogin();
                navigate("/subjects");
            })
            .catch((error) => {
                if (error.response && (error.response.status === 400)) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("We're sorry, a problem occurred with us :( Please be patient. <3");
                }
            });
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                </Box>
                <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                    Login
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
                        label="Password"
                        name="password"
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

export default Login;
