import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const LeaderboardQuiz = () => {
    const { quizId } = useParams();
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboardInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/user/leaderboard/${quizId}`);
                setLeaderboardInfo(response.data);
                const response1 = await axios.get(`http://localhost:8081/api/quizzes/${quizId}`);
                setQuizInfo(response1.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardInfo();
    }, [quizId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const titleStyle = {
        marginTop: "30px",
        textAlign: "center",
        marginBottom: "30px"
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        padding: "30px",
        margin: "auto",
        width: "40%"
    };

    const thTdStyle = {
        border: '1px solid black',
        width: '20%',
        textAlign: 'center',
        padding: "20px"
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2'
    };

    const buttonstyle = {
        backgroundColor: 'blue',
        border: "2px solid white",
        padding: "5px",
        textDecoration: "none",
        color: "white",
        width: "150px",
        float: "right",
        marginRight: "200px",
        marginTop: "30px",
        alignSelf: "right"
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div>
            <div>
                <h1 style={titleStyle}>Title: {quizInfo.quizTitle}</h1>
                <h2 style={titleStyle}>Subject: {quizInfo.subject?.subjectName || 'N/A'}</h2>
                <h4 style={titleStyle}>Description: {quizInfo.quizDescription}</h4>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>Username</th>
                    <th style={thStyle}>Start Time</th>
                    <th style={thStyle}>Finish Time</th>
                    <th style={thStyle}>Final Result</th>
                </tr>
                </thead>
                <tbody>
                {leaderboardInfo.map((l, index) => (
                    <tr key={index}>
                        <td style={thTdStyle}>{l.user.username}</td>
                        <td style={thTdStyle}>{formatDate(l.startTime)}</td>
                        <td style={thTdStyle}>{formatDate(l.finishTime)}</td>
                        <td style={thTdStyle}>{l.finalResult}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/leaderboard"}>
                <button style={buttonstyle}>Go back</button>
            </Link>
        </div>
    );
};

export default LeaderboardQuiz;
