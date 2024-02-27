import React from 'react';
import {useNavigate} from 'react-router-dom';

const QuestionBoolCreate = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        questionText: "",
        quizId: "",
        isCorrect:false
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
        const isCorrect=formData.isCorrect;

        console.log(props.quiz.quizId)
        console.log(formData)
        const quizId = props.quiz.quizId;

        props.onQuestionBoolCreate(questionText,quizId,isCorrect);
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
                        <label>CLick checkbox if question statement is true.If false don't check the checkbox!</label>
                        <div>True<input type="checkbox" id="isCorrect" name="isCorrect" value="true"
                                     onChange={handleChange}/></div>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionBoolCreate;
