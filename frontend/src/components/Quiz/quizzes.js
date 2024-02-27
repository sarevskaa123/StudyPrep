import React from "react";
import QuizTerm from "./QuizTerm";
import {Link} from "react-router-dom";

class Quizzes extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let  authenticate
        if (this.props.user != null) {
            authenticate = <Link to={"/addQuiz"} className={"btn btn-block btn-success"} style={{margin:"30px"}}>Create new Quiz</Link>
        }
        console.log(this.props.user)
        return (
            <div>

                <div>
                    {authenticate}
{/*
                    <Link to={"/addQuiz"} className={"btn btn-block btn-success"} style={{margin:"30px"}}>Create new Quiz</Link>
*/}
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th scope={"col"} style={{padding: "20px"}}>Name</th>
                                <th scope={"col"} style={{padding: "20px"}}>Description</th>
                                <th scope={"col"} style={{padding: "20px"}}>Date created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.quizzes.map((term)=>{
                                return(
                                    <QuizTerm term={term} key={term} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onView={this.props.onView}/>
                                );
                            })}
                            {/*{this.quizzes}*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }


}

export default Quizzes;