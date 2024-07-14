import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UserInfo = (props) => {
    const [userInfo, setUserInfo] = useState({
        userInfo: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('UserId');
                const response = await axios.get(`http://localhost:8081/api/user/${userId}`);
                console.log(response)
                setUserInfo(response.data);
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
        width: '20px',
        textAlign: 'center',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2',
    };


    return (
        <div>
            <h1>User Information</h1>
            <p>Email: {userInfo[0].email}</p>
            <p>Register Date: {userInfo[0].registerDate}</p>
            <p>Username: {userInfo[0].username}</p>


            <h2>All attempts for user {userInfo[0].username}</h2>
            <table style={tableStyle}>
                <tr>
                    <td style={thTdStyle}>Quiz title</td>
                    <td style={thTdStyle}>Subject</td>
                    <td style={thTdStyle}>Start time</td>
                    <td style={thTdStyle}>Finish time</td>
                    <td style={thTdStyle}>Total points</td>
                </tr>

                {userInfo[1].map(quizAttempt => (
                        <tr>
                            {/*<li key={quizAttempt.attemptId}>*/}
                            <td style={thStyle}><p> {quizAttempt.quiz.quizTitle}</p></td>
                            <td style={thStyle}><p> {quizAttempt.quiz.subjectId.subjectName}</p></td>
                            <td style={thStyle}><p> {quizAttempt.startTIme}</p></td>
                            <td style={thStyle}><p> {quizAttempt.finishTIme}</p></td>
                            <td style={thStyle}><p> {quizAttempt.finalResult}</p></td>
                            {/*</li>*/}
                        </tr>
                    )
                )}
            </table>
        </div>
    );
}


export default UserInfo;
