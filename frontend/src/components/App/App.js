import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../Header/header";
import QuizAdd from "../Quiz/QuizAdd";
import QuizEdit from "../Quiz/QuizEdit";
import Quizzes from "../Quiz/quizzes";
import Register from "../Users/Register";
import Login from "../Users/Login";
import StudyPrepService from "../../repository/StudyPrepRepository";
import Home from "../Home/Home";
import QuestionSingleCreate from "../Question/QuestionSingleCreate";
import QuestionMultipleCreate from "../Question/QuestionMultipleCreate";
import QuestionBoolCreate from "../Question/QuestionBoolCreate";
import QuestionTextCreate from "../Question/QuestionTextCreate";
import QuestionsList from "../Question/QuestionsList";


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

    render() {
        return (
            <Router>
                <Header user={this.state.user}
                        // onDelete={this.logout}
                />
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/question/allQuestions/:id"} element={
                                <QuestionsList questions={this.state.quizQuestions}
                                               onDeleteQuestion={this.deleteQuestion}
                                               user={this.state.user}
                                />}/>
                            <Route path={"/addQuiz"} element={
                                <QuizAdd subject={this.state.subjects}
                                         user={this.state.user}
                                         onAddQuiz={this.addQuiz}/>}/>
                            <Route path={"/editQuiz/:id"} element={
                                <QuizEdit subject={this.state.subjects} onEditQuiz={this.editQuiz}
                                          quiz={this.state.selectedQuiz}
                                          user={this.state.user}/>}/>
                            <Route path={"/admin"} element={<Quizzes quizzes={this.state.quizzes}
                                                                     user={this.state.user}
                                                                     onDelete={this.deleteQuiz}
                                                                     onEdit={this.getQuiz}
                                                                     onView={this.loadQuestionsForQuiz}
                            />}/>
                            <Route path={"/question/addSingle/:id"}
                                   element={<QuestionSingleCreate onQuestionSingleCreate={this.questionSingleCreate}
                                                                  quiz={this.state.selectedQuiz}
                                   user={this.state.user}/>}/>
                            <Route path={"/question/addMultiple/:id"}
                                   element={<QuestionMultipleCreate
                                       onQuestionMultipleCreate={this.questionMultipleCreate}
                                       quiz={this.state.selectedQuiz}
                                       user={this.state.user}/>}/>
                            <Route path={"/question/addBool/:id"}
                                   element={<QuestionBoolCreate onQuestionBoolCreate={this.questionBoolCreate}
                                                                user={this.state.user}
                                                                quiz={this.state.selectedQuiz}/>}/>
                            <Route path={"/question/addText/:id"}
                                   element={<QuestionTextCreate onQuestionTextCreate={this.questionTextCreate}
                                                                user={this.state.user}
                                                                quiz={this.state.selectedQuiz}/>}/>
                            <Route path={"/profile"}/>
                            <Route path={"/quizzes"}/>
                            <Route path={"/login"} element={<Login onLogin={this.fetchData}/>}/>
                            <Route path={"/register"} element={<Register onRegister={this.fetchData}/>}/>
                            <Route path={"/"} element={<Home user={this.state.user}/>}/>
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
    // register = (username,email,password,repeatPassword)=>{
    //     StudyPrepService.register(username,email,password,repeatPassword).then()
    // }

    // login = (username, password) => {
    //     StudyPrepService.login(username, password)
    //         .then(resp => {
    //             this.setState({
    //                 user: resp.data
    //             })
    //         })
    // }

    // logout = () => {
    //     this.setState({
    //         user: null
    //     })
    // }

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