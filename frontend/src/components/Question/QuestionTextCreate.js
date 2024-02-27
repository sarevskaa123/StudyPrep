import React from 'react';
import {useNavigate} from 'react-router-dom';

const QuestionTextCreate = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        questionText: "",
        quizId: "",
        answerText:""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const questionText = formData.questionText;
        const answerText = formData.answerText;

        const quizId = props.quiz.quizId;

        props.onQuestionTextCreate(questionText,answerText,quizId);
        history("/admin");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="questionText">Question text</label>
                        <input type="text"
                               className="form-control"
                               id="questionText"
                               name="questionText"
                               required
                               placeholder="Enter question text"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer1">Answer text</label>
                        <input type="text"
                               className="form-control"
                               id="answerText"
                               name="answerText"
                               placeholder="answerText"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionTextCreate;
