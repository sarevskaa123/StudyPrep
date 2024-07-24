import React from 'react';
import { Link } from "react-router-dom";

const Leaderboard = (props) => {
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
    const buttonStyle = {
        backgroundColor: 'green',
        border: "2px solid white",
        padding: "5px",
        textDecoration: "none",
        color: "white",
        width: "150px"
    };

    return (
        <div>
            <h1 style={titleStyle}>Leaderboards for all quizzes</h1>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thTdStyle}>Quiz Title</th>
                    <th style={thTdStyle}>Subject</th>
                    <th style={thTdStyle}></th>
                </tr>
                </thead>
                <tbody>
                {props.quizzes.map((q, index) => (
                    <tr key={index}>
                        <td style={thTdStyle}>{q.quizTitle}</td>
                        <td style={thTdStyle}>{q.subject?.subjectName || 'N/A'}</td>
                        <td style={thTdStyle}>
                            <Link to={`/leaderboardQuiz/${q.quizId}`}>
                                <button style={buttonStyle}>See leaderboard</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
