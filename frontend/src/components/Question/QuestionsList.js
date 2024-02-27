import React from "react";
import {Link} from "react-router-dom";

const QuestionsList = (props) => {


        return (
            <div>
                <div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th scope={"col"} >Question text</th>
                                <th scope={"col"}></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <div>
                            {props.questions.map((term)=>{
                                return(
                                    <div>
                                  <p>{term}</p>
                                <a title={"DeleteQuestion"} className={"btn btn-danger"}
                                   onClick={() => props.onDeleteQuestion(term)}>
                                    Delete question
                                </a>
                                    </div>
                                );
                            })}
                                </div>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }


export default QuestionsList;