import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "../Header/header";
import LeaderboardQuiz from "../Quiz/LeaderboardQuiz";
import QuizEdit from '../Quiz/QuizEdit';
import QuestionEdit from '../Question/QuestionEdit';
import Subject from '../Subject/Subject';
import SubjectDetail from '../Subject/SubjectDetail';
import Register from "../Users/Register";
import Login from "../Users/Login";
import StudyPrepService from "../../repository/StudyPrepRepository";
import Home from "../Home/Home";
import UserInfo from "../Users/userProfile";
import AttemptDetails from "../Users/AttemptDetails";
import Leaderboard from "../Users/Leaderboard";
import QuizStart from '../Quiz/QuizStart';
import QuizInfo from '../Quiz/QuizInfo';
import axios from 'axios'; // Add this import statement
import theme from '../../theme/theme'; // Import the theme

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            subjects: [],
            selectedQuiz: {},
            user: {},
            userInfo: [],
            quizQuestions: []
        };
    }

    fetchSubjectDetails = async (subjectId) => {
        try {
            const response = await fetch(`/api/subjects/${subjectId}`);
            const text = await response.text();
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return JSON.parse(text);
        } catch (error) {
            console.error("Failed to fetch subject details:", error);
            throw error;
        }
    };

    addQuizToSubject = async (subjectId, quizData) => {
        try {
            const endpoint = `/quizzes/${subjectId}/add`;
            const response = await axios.post(endpoint, {quizTitle: quizData});
            const text = await response.text();
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return JSON.parse(text);
        } catch (error) {
            console.error("Failed to add quiz to subject:", error);
            throw error;
        }
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <Header user={this.state.user}/>
                    <main>
                        <div className={"container"}>
                            <Routes>
                                <Route path={"/editQuiz/:id"} element={
                                    <QuizEdit/>}/>
                                <Route path={"/quizzes/edit/:quizId"} element={<QuizEdit/>}/>
                                <Route path={"/quizzes/info/:quizId"} element={<QuizInfo/>}/>
                                <Route path={"/profile"} element={<UserInfo/>}/>
                                <Route path="/subjects" element={<Subject/>}/>
                                <Route path="/subjects/:subjectId" element={
                                    <SubjectDetail fetchSubjectDetails={this.fetchSubjectDetails}
                                                   addQuizToSubject={this.addQuizToSubject}/>}/>
                                <Route path="/leaderboard" element={<Leaderboard quizzes={this.state.quizzes}/>}/>
                                <Route path={"/login"} element={<Login onLogin={this.fetchData}/>}/>
                                <Route path={"/register"} element={<Register onRegister={this.fetchData}/>}/>
                                <Route path={"/"} element={<Home user={this.state.user}/>}/>
                                <Route path="/questions/edit/:questionId" element={<QuestionEdit/>}/>
                                <Route path="/attempt/:attemptId" element={<AttemptDetails/>}/>
                                <Route path="/leaderboardQuiz/:quizId" element={<LeaderboardQuiz/>}/>
                                <Route path="/quizzes/start/:quizId" element={<QuizStart/>}/>
                            </Routes>
                        </div>
                    </main>
                </Router>
            </ThemeProvider>
        );
    }

    loadQuizzes = () => {
        StudyPrepService.fetchQuiz().then((data) => {
            this.setState({
                quizzes: data.data
            });
        });
    }

    loadSubjects = () => {
        StudyPrepService.fetchSubject().then((data) => {
            this.setState({
                subjects: data.data
            });
        });
    }

    // loadQuestions = () => {
    //     StudyPrepService.fetchQuestions().then((data) => {
    //         this.setState({
    //             quizQuestions: data.data
    //         });
    //     });
    // }
    //
    // getUserInfo = (id) => {
    //     StudyPrepService.getUserInfo(id).then((data) => {
    //         this.setState({
    //             userInfo: data.data
    //         });
    //     });
    // }
    //
    // loadQuestionsForQuiz = (id) => {
    //     StudyPrepService.fetchQuestionsForQuiz(id).then((data) => {
    //         this.setState({
    //             quizQuestions: data.data
    //         });
    //     });
    // }
    //
    // deleteQuiz = (id) => {
    //     StudyPrepService.deleteQuiz(id).then(() => {
    //         this.loadQuizzes();
    //     });
    // }
    //
    // deleteQuestion = (questionText) => {
    //     StudyPrepService.deleteQuestionAll(questionText).then(() => {
    //         this.loadQuizzes();
    //     });
    // }
    //
    // addQuiz = (userId, quizTitle, quizDescription, subject) => {
    //     StudyPrepService.addQuiz(userId, quizTitle, quizDescription, subject).then(() => {
    //         this.loadQuizzes();
    //     });
    // }
    //
    // getQuiz = (id) => {
    //     StudyPrepService.getQuiz(id).then((data) => {
    //         this.setState({
    //             selectedQuiz: data.data
    //         });
    //     });
    // }
    //
    // editQuiz = (id, quizTitle, quizDescription, subject) => {
    //     StudyPrepService.editQuiz(id, quizTitle, quizDescription, subject).then(() => {
    //         this.loadQuizzes();
    //     });
    // }

    fetchData = () => {
        this.loadQuizzes();
        this.loadSubjects();
    }

    // componentDidMount() {
    //     this.fetchData();
    // }
}

export default App;
