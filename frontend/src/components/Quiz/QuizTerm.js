import React from "react";
import {Link} from "react-router-dom";

const QuizTerm = (props) => {
    return (
        <tr>
            <td>{props.term.quizTitle}</td>
            <td>{props.term.quizDescription}</td>
            <td>{props.term.quizDateCreated}</td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"} style={{margin:"10px"}}
                   onClick={() => props.onDelete(props.term.quizId)}>
                    Delete
                </a>
                <Link className={"btn btn-info ml-2"} style={{margin:"10px"}} key={props.term} onClick={() => props.onEdit(props.term.quizId)}
                      to={`/editQuiz/${props.term.quizId}`}
                >Edit</Link>

            </td>
            <td>
                <Link className={"btn btn-success ml-2"} key={props.term} style={{marginLeft:"10px"}}
                      onClick={() => props.onView(props.term.quizId)}
                      to={`/question/allQuestions/${props.term.quizId}`}
                >View questions</Link>
            </td>
            <td><Link className={"btn btn-info ml-2"} style={{marginLeft:"10px"}} onClick={() => props.onEdit(props.term.quizId)}
                      to={`/question/addSingle/${props.term.quizId}`}
            >Add Single Choice Question</Link></td>
            <td><Link className={"btn btn-info ml-2"} style={{marginLeft:"10px"}} onClick={() => props.onEdit(props.term.quizId)}
                      to={`/question/addMultiple/${props.term.quizId}`}
            >Add Multiple Choice Question</Link></td>
            <td><Link className={"btn btn-info ml-2"} style={{marginLeft:"10px"}} onClick={() => props.onEdit(props.term.quizId)}
                      to={`/question/addBool/${props.term.quizId}`}
            >Add Bool Question</Link></td>
            <td><Link className={"btn btn-info ml-2"} style={{marginLeft:"10px"}} onClick={() => props.onEdit(props.term.quizId)}
                      to={`/question/addText/${props.term.quizId}`}
            >Add Text Question</Link></td>

        </tr>
    )
}

export default QuizTerm;
