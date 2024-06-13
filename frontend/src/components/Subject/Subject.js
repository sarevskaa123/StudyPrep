// src/components/Subject/Subject.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../custom-axios/axios';

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

    // const handleAddSubject = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('/subjects', { subjectName: newSubjectName });
    //         setSubjects([...subjects, response.data]);
    //         setNewSubjectName('');
    //     } catch (error) {
    //         console.error('Error adding subject:', error);
    //     }
    // };

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
        <div>
            <h1>Subjects</h1>
            <form onSubmit={handleAddSubject}>
                <input
                    type="text"
                    placeholder="Enter new subject name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                />
                <button type="submit">Add Subject</button>
            </form>
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.subjectId}>
                        <Link to={`/subjects/${subject.subjectId}`}>{subject.subjectName}</Link>
                        <button onClick={() => handleDeleteSubject(subject.subjectId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subject;
