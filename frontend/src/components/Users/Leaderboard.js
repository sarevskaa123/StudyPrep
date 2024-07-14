import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

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

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2'
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
                <tr>
                    <td style={thTdStyle}>Quiz Title</td>
                    <td style={thTdStyle}>Subject</td>
                    <td style={thTdStyle}></td>

                </tr>
                {props.quizzes.map(q => (
                    <tr>
                        <td style={thStyle}><p>{q.quizTitle}</p></td>
                        <td style={thStyle}><p>{q.subjectId.subjectName}</p></td>
                        <td style={thStyle}>
                            <Link to={`/leaderboardQuiz/${q.quizId}`} ><button style={buttonStyle}>See leaderboard
                            </button></Link>

                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );

}

export default Leaderboard;