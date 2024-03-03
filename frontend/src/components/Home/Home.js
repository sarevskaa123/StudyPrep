import React from 'react';

const Home = (props) => {

    console.log(localStorage.getItem("Username"))
    console.log(localStorage.getItem("Email"))
    console.log(localStorage.getItem("Userrole"))
    console.log(localStorage.getItem("UserId"))


    return (
        <div>
     <h1>Welcome to Study prep. Study prep is a quiz app for solving quizzes related about
         FINKI subjects.Enjoy and learn!</h1>
        </div>
    )
}

export default Home;
