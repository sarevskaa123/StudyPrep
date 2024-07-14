import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import leaderboard from "../Users/Leaderboard";

const LeaderboardQuiz = (props) => {
    const {quizId} = useParams();
    const [leaderboardInfo, setLeaderboardInfo] = useState({
        leaderboardInfo: []
    });
    const [quizInfo, setQuizInfo] = useState({
        quizInfo: []
    });
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

        // const FetchQuizinfo = async () =>{
        //     try {
        //         const response = await axios.get(`http://localhost:8081/api/quizzes/${quizId}`);
        //         setQuizInfo(response.data);
        //     } catch (err) {
        //         setError(err);
        //     } finally {
        //         setLoading(false);
        //     }
        //
        // };

        //      FetchQuizinfo();
        fetchLeaderboardInfo();
    }, []);


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
    }


    return (
        <div>
            <div>
                <h1 style={titleStyle}>Title: {quizInfo.quizTitle}</h1>
                <h2 style={titleStyle}>Subject: {quizInfo.subjectId.subjectName}</h2>
                <h4 style={titleStyle}>Description: {quizInfo.quizDescription}</h4>
            </div>

            <table style={tableStyle}>
                {leaderboardInfo.map(l => (
                    <tr>
                        <td style={thTdStyle}>{l.user.username}</td>
                        <td style={thTdStyle}>{l.startTIme}</td>
                        <td style={thTdStyle}>{l.finishTIme}</td>
                        <td style={thTdStyle}>{l.finalResult}</td>
                    </tr>
                ))}
            </table>
            <Link to={"/leaderboard"}>
                <button style={buttonstyle}>Go back</button>
            </Link>
        </div>

    )

}


export default LeaderboardQuiz;