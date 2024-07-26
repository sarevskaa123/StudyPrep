import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('UserId');
                const response = await axios.get(`http://localhost:8081/api/user/${userId}`);
                setUserInfo(response.data);
                console.log(response.data); // Log the received data for debugging
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thTdStyle = {
        border: '1px solid black',
        textAlign: 'center',
        padding: '8px',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2',
    };

    return (
        <div>
            <h1>User Information</h1>
            {userInfo && userInfo.user && (
                <>
                    <p>Email: {userInfo.user.email}</p>
                    <p>Register Date: {new Date(userInfo.user.registerDate).toLocaleString()}</p>
                    <p>Username: {userInfo.user.username}</p>

                    <h2>All attempts for user {userInfo.user.username}</h2>
                    <table style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={thStyle}>Quiz Title</th>
                            <th style={thStyle}>Subject</th>
                            <th style={thStyle}>Start Time</th>
                            <th style={thStyle}>Finish Time</th>
                            <th style={thStyle}>Total Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userInfo.attempts && userInfo.attempts.length > 0 ? (
                            userInfo.attempts.map(attempt => (
                                <tr key={attempt.attemptId}>
                                    <td style={thTdStyle}><Link to={`/attempt/${attempt.attemptId}`}>{attempt.quiz?.quizTitle || 'N/A'}</Link></td>
                                    <td style={thTdStyle}>{attempt.quiz?.subject?.subjectName || 'N/A'}</td>
                                    <td style={thTdStyle}>{attempt.startTime ? new Date(attempt.startTime).toLocaleString() : 'N/A'}</td>
                                    <td style={thTdStyle}>{attempt.finishTime ? new Date(attempt.finishTime).toLocaleString() : 'N/A'}</td>
                                    <td style={thTdStyle}>{attempt.finalResult}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={thTdStyle}>No attempts found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default UserInfo;
