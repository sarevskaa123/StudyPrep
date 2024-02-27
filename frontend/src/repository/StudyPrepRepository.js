import axios from "../custom-axios/axios";

const StudyPrepService = {

    fetchQuiz: () => {
        return axios.get("/quizzes");
    },
    fetchSubject:()=>{
        return axios.get("/subjects");
    },
    fetchQuestions:()=>{
        return axios.get("/question/all");
    },
    fetchQuestionsForQuiz:(id)=>{
        return axios.get(`/question/allQuestions/${id}`);
    },
    deleteQuiz:(id)=>{
        return axios.delete(`/quiz/delete/${id}`)

    },
    // deleteQuestion:(id)=>{
    //     return axios.delete(`/question/delete/${id}`)
    // },
    deleteQuestionAll:(questionText)=>{
        return axios.delete(`/question/deleteQuestions/${questionText}`)
    },
    addQuiz: (userId,quizTitle,quizDescription,subject) =>{
        return axios.post("/addQuiz",{
            "userId":userId,
            "quizTitle": quizTitle,
            "quizDescription": quizDescription,
            "subject": subject
        })
    },
    editQuiz:(id,quizTitle,quizDescription,subject)=> {
        return axios.put(`/editQuiz/${id}`,{
            "quizTitle": quizTitle,
            "quizDescription": quizDescription,
            "subject": subject
        });
    },
    getQuiz:(id) => {
        return axios.get(`/quiz/${id}`);
    },
    register:(username,email,password,repeatPassword)=>{
        return axios.post("/register/user",{
            "username":username,
            "email":email,
            "password":password,
            "repeatPassword":repeatPassword
        });
    },
    login: (email, password) => {
        return axios.post("/login/user", {
            "email": email,
            "password": password
        });
    },
    // getAllMultipleQuestions:(id) =>{
    //     return axios.get(`/question/multiple/${id}`);
    // },
    // getAllSingleQuestions:(id) =>{
    //     return axios.get(`/question/single/${id}`);
    // },
    // getAllBoolQuestions:(id) =>{
    //     return axios.get(`/question/bool/${id}`);
    //
    // },
    // getAllTextQuestions:(id)=>{
    //     return axios.get(`/question/text/${id}`);
    // },
    createSingleQuestion:(questionText, quizId,answer1,answer2,answer3,answer4,answerCorrect)=>{
        return axios.post(`/question/${quizId}/addSingle`,{
            "questionText":questionText,
            "quizId":quizId,
            "answer1":answer1,
            "answer2":answer2,
            "answer3":answer3,
            "answer4":answer4,
            "answerCorrect":answerCorrect

        });
    },
    createMultipleQuestion:(questionText,quizId,answer1,answer2,answer3,answer4,checked1,checked2,checked3,checked4)=>{
        return axios.post(`/question/${quizId}/addMultiple`,{
            "questionText":questionText,
            "quizId":quizId,
            "answer1":answer1,
            "answer2":answer2,
            "answer3":answer3,
            "answer4":answer4,
            "checked1":checked1,
            "checked2":checked2,
            "checked3":checked3,
            "checked4":checked4
        });
    },
    createBoolQuestion:(questionText,quizId,isCorrect)=>{
        return axios.post(`/question/${quizId}/addBool`,{
           "questionText":questionText,
           "quizId":quizId,
           "isCorrect":isCorrect
        });
    },
    createTextQuestion:(questionText,answerText,quizId)=> {
        return axios.post(`/question/${quizId}/addText`,{
            "questionText":questionText,
            "quizId":quizId,
            "answerText":answerText
        });
    }
}


export default StudyPrepService;