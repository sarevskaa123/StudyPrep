import React from 'react';
import {useNavigate} from 'react-router-dom';

const QuizAdd = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        quizTitle: "",
        quizDescription: "",
        subject: 1,
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const quizTitle = formData.quizTitle;
        const quizDescription = formData.quizDescription;
        const subject = formData.subject;
        const userId = props.user.userId;

        props.onAddQuiz(userId,quizTitle,quizDescription,subject);
        history("/admin");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="quizTitle">Quiz name</label>
                        <input type="text"
                               className="form-control"
                               id="quizTitle"
                               name="quizTitle"
                               required
                               placeholder="Enter quiz name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quizDescription">Quiz description</label>
                        <input type="text"
                               className="form-control"
                               id="quizDescription"
                               name="quizDescription"
                               placeholder="quizDescription"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <select name="subject" className="form-control" onChange={handleChange}>
                                <option value="">---</option>
                            {props.subject.map((term) =>
                                <option value={term.subjectId}>{term.subjectName}</option>
                            )}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuizAdd;
