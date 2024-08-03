import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    const authenticate = localStorage.getItem("Username") ? (
        <Box display="flex" alignItems="center">
            <Button color="inherit" component={Link} to="/subjects">Subjects</Button>
            <Button color="inherit" component={Link} to="/leaderboard">Leaderboard</Button>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
    ) : (
        <Box display="flex" alignItems="center">
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Study Prep
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {authenticate}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
