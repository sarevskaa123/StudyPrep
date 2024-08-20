import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../custom-axios/axios';
import { Container, Typography, TextField, Button, Card, CardContent, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import '@fontsource/roboto-slab'; // Add a custom font from Google Fonts

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState('');

    const theme = useTheme();
    const iconColor = theme.palette.mode === 'dark' ? 'white' : 'black';

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/subjects/add', {
                subjectName: newSubjectName.trim()
            });
            console.log('Subject added:', response.data);
            setNewSubjectName('');
            fetchSubjects();  // Refresh the subjects list
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    const handleDeleteSubject = async (id) => {
        try {
            await axios.delete(`/subjects/delete/${id}`);
            setSubjects(subjects.filter(subject => subject.subjectId !== id));
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ height: '100vh', overflowY: 'auto', pb: 4 }}>
            <Typography
                variant="h3"
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
                }}
            >
                Subjects
            </Typography>
            {localStorage.getItem("Userrole") === "ADMIN" ? (
                <Box component="form" onSubmit={handleAddSubject} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                        variant="outlined"
                        label="Enter new subject name"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        fullWidth
                        sx={{ mr: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" endIcon={<AddIcon />}>
                        Add Subject
                    </Button>
                </Box>
            ) : (<div></div>)}
            <Box sx={{ display: 'grid', gap: 2 }}>
                {subjects.map((subject, index) => (
                    <Card
                        key={subject.subjectId}
                        component={Link}
                        to={`/subjects/${subject.subjectId}`}
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            textDecoration: 'none',
                            color: 'inherit',
                            backgroundImage: index % 2 === 0
                                ? `linear-gradient(to left, ${theme.palette.background.default}, ${theme.palette.action.hover})`
                                : `linear-gradient(to right, ${theme.palette.background.default}, ${theme.palette.action.hover})`,
                            transition: 'background-color 0.5s ease', // Slower transition
                            '&:hover::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(to right, ${theme.palette.action.hover} 50%, transparent 100%)`, // Lighter color
                                opacity: 0.9, // More visible hover effect
                                transition: 'opacity 0.5s ease-in-out', // Slower transition
                            },
                            '&:hover': {
                                transform: 'scale(1.02)',
                            }
                        }}
                    >
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                                {subject.subjectName}
                            </Typography>
                            <Box>
                                {localStorage.getItem("Userrole") === "ADMIN" ? (
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent the card click from triggering when deleting
                                            handleDeleteSubject(subject.subjectId);
                                        }}
                                        sx={{ mr: 0.25 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                ) : (<div></div>)}
                                {localStorage.getItem("Userrole") === "ADMIN" ? (
                                    <IconButton
                                        edge="end"
                                        component={Link}
                                        to={`/subjects/${subject.subjectId}`}
                                        onClick={(e) => e.stopPropagation()} // Prevent the card click from triggering when editing
                                        sx={{ ml: 0.25 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                ) : (<div></div>)}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Subject;
