import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../Header/header";
import QuizAdd from "../Quiz/QuizAdd";
import QuizEdit from '../Quiz/QuizEdit';
import QuestionEdit from '../Question/QuestionEdit';
import Quizzes from "../Quiz/quizzes";
import Subject from '../Subject/Subject';
import SubjectDetail from '../Subject/SubjectDetail';
import Register from "../Users/Register";
import Login from "../Users/Login";
import StudyPrepService from "../../repository/StudyPrepRepository";
import Home from "../Home/Home";
import axios from "../../custom-axios/axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            subjects: [],
            selectedQuiz: {},
            user: {},
            quizQuestions: []
        }
    }

    fetchSubjectDetails = async (subjectId) => {
        try {
            const response = await fetch(`/api/subjects/${subjectId}`);
            const text = await response.text();
            console.log("fetchSubjectDetails response text:", text); // Log response text
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
            console.log("addQuizToSubject endpoint:", endpoint); // Log the endpoint
            const response = await axios.post(endpoint, {
                quizTitle: quizData
            });
            const text = await response.text();
            console.log("addQuizToSubject response text:", text); // Log response text
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
            <Router>
                <Header user={this.state.user} />
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/addQuiz"} element={
                                <QuizAdd subject={this.state.subjects}
                                         user={this.state.user}
                                         onAddQuiz={this.addQuiz}/>}/>
                            <Route path={"/editQuiz/:id"} element={
                                <QuizEdit subject={this.state.subjects} onEditQuiz={this.editQuiz}
                                          quiz={this.state.selectedQuiz}
                                          user={this.state.user}/>}/>
                            <Route path={"/quizzes/edit/:quizId"} element={
                                <QuizEdit onEditQuiz={this.editQuiz} />
                            } />
                            <Route path={"/admin"} element={<Quizzes quizzes={this.state.quizzes}
                                                                     user={this.state.user}
                                                                     onDelete={this.deleteQuiz}
                                                                     onEdit={this.getQuiz}
                                                                     onView={this.loadQuestionsForQuiz}
                            />}/>

                            <Route path={"/profile"}/>
                            <Route path="/subjects" element={<Subject />} />
                            <Route path="/subjects/:subjectId" element={
                                <SubjectDetail
                                    fetchSubjectDetails={this.fetchSubjectDetails}
                                    addQuizToSubject={this.addQuizToSubject}
                                />
                            } />
                            <Route path="/quizzes" element={<Quizzes />} />
                            <Route path={"/login"} element={<Login onLogin={this.fetchData}/>}/>
                            <Route path={"/register"} element={<Register onRegister={this.fetchData}/>}/>
                            <Route path={"/"} element={<Home user={this.state.user}/>}/>
                            <Route path="/questions/edit/:questionId" element={<QuestionEdit />} />
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }

    loadQuizzes = () => {
        StudyPrepService.fetchQuiz().then((data) => {
            this.setState({
                quizzes: data.data
            })
        });
    }

    loadSubjects = () => {
        StudyPrepService.fetchSubject().then((data) => {
            this.setState({
                subjects: data.data
            })
        });
    }

    loadQuestions=()=>{
        StudyPrepService.fetchQuestions().then((data)=>{
            this.setState({
                quizQuestions:data.data
            })
        })
    }

    loadQuestionsForQuiz = (id) => {
        StudyPrepService.fetchQuestionsForQuiz(id).then((data) => {
            this.setState({
                quizQuestions: data.data
            })
        })
    }
    deleteQuiz = (id) => {
        StudyPrepService.deleteQuiz(id).then(() => {
            this.loadQuizzes();
        })
    }

    deleteQuestion = (questionText) => {
        StudyPrepService.deleteQuestionAll(questionText).then(() => {
            this.loadQuizzes();
        })
    }

    addQuiz = (userId, quizTitle, quizDescription, subject) => {
        StudyPrepService.addQuiz(userId, quizTitle, quizDescription, subject).then(() => {
            this.loadQuizzes();
        })
    }

    getQuiz = (id) => {
        StudyPrepService.getQuiz(id).then((data) => {
            this.setState({
                selectedQuiz: data.data
            })
        })
    }

    editQuiz = (id, quizTitle, quizDescription, subject) => {
        StudyPrepService.editQuiz(id, quizTitle, quizDescription, subject)
            .then(() => {
                this.loadQuizzes();
            })
    }

    questionSingleCreate = (questionText, quizId, answer1, answer2, answer3, answer4, answerCorrect) => {
        StudyPrepService.createSingleQuestion(questionText, quizId, answer1, answer2, answer3, answer4, answerCorrect)
            .then(() => {
                this.loadQuizzes();
            })
    }

    questionMultipleCreate = (questionText, quizId, answer1, answer2, answer3, answer4, checked1, checked2, checked3, checked4) => {
        StudyPrepService.createMultipleQuestion(questionText, quizId, answer1, answer2, answer3, answer4, checked1, checked2, checked3, checked4)
            .then(() => {
                this.loadQuizzes();
            })
    }

    questionBoolCreate = (questionText, quizId, isCorrect) => {
        StudyPrepService.createBoolQuestion(questionText, quizId, isCorrect)
            .then(() => {
                this.loadQuizzes();
            })
    }

    questionTextCreate = (questionText, answerText, quizId) => {
        StudyPrepService.createTextQuestion(questionText, answerText, quizId)
            .then(() => {
                this.loadQuizzes();
            })
    }

    fetchData = () => {
        this.loadQuizzes();
        this.loadSubjects();
    }

    componentDidMount() {
        this.fetchData();
    }
}

export default App;
