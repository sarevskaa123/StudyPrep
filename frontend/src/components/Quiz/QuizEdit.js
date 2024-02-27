import React from 'react';
import {useNavigate} from 'react-router-dom';

const QuizEdit = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        quizTitle: "",
        quizDescription: "",
        subject: 0,
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }


    const onFormSubmit = (e) => {
        e.preventDefault();
        const quizTitle = formData.quizTitle !== "" ? formData.quizTitle : props.quiz.quizTitle;
        const quizDescription = formData.quizDescription !== "" ? formData.quizDescription : props.quiz.quizDescription;
        const subject = formData.subject !== 0 ? formData.subject : props.quiz.subjectId.subjectId;

        props.onEditQuiz(props.quiz.quizId, quizTitle, quizDescription,subject);
        history("/admin");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Quiz name</label>
                        <input type="text"
                               className="form-control"
                               id="quizTitle"
                               name="quizTitle"
                               placeholder={props.quiz.quizTitle}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Quiz description</label>
                        <input type="text"
                               className="form-control"
                               id="quizDescription"
                               name="quizDescription"
                               placeholder={props.quiz.quizDescription}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <select name="subject" className="form-control" onChange={handleChange}>
                            {props.subject.map((term) => {
                                if(props.quiz.subjectId !== undefined &&
                                    props.quiz.subjectId.subjectId === term.subjectId)
                                    return <option defaultValue={props.quiz.subjectId.subjectId} value={term.subjectId}>{term.subjectName}</option>
                                else return <option value={term.subjectId}>{term.subjectName}</option>
                            })}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuizEdit;
