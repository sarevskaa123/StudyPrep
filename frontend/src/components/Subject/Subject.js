import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../custom-axios/axios';
import { Container, Typography, TextField, Button, Card, CardContent, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState('');

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
        <Container maxWidth="md">
            <Typography variant="h4" component="div" gutterBottom>
                Subjects
            </Typography>
            { localStorage.getItem("Userrole") === "ADMIN" ? (
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
                {subjects.map((subject) => (
                    <Card key={subject.subjectId} variant="outlined">
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                                {subject.subjectName}
                            </Typography>
                            <Box>
                                { localStorage.getItem("Userrole") === "ADMIN" ? (
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubject(subject.subjectId)}>
                                    <DeleteIcon />
                                </IconButton>
                                ):(<div></div>)}
                                    <IconButton edge="end" component={Link} to={`/subjects/${subject.subjectId}`}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Subject;
