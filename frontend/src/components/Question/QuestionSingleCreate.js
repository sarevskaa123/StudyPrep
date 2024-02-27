import React from 'react';
import {useNavigate} from 'react-router-dom';

const QuestionSingleCreate = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        questionText: "",
        quizId: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answerCorrect:0
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
        const answer1 = formData.answer1;
        const answer2 = formData.answer2;
        const answer3 = formData.answer3;
        const answer4 = formData.answer4;
        const answerCorrect = formData.answerCorrect;

        const quizId = props.quiz.quizId;

        props.onQuestionSingleCreate(questionText,quizId,answer1,answer2,answer3,answer4,answerCorrect);
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
                        <label htmlFor="answer1">Answer 1</label>
                        <input type="text"
                               className="form-control"
                               id="answer1"
                               name="answer1"
                               placeholder="answer1"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer2">Answer 2</label>
                        <input type="text"
                               className="form-control"
                               id="answer2"
                               name="answer2"
                               placeholder="answer2"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="answer3">Answer 3</label>
                    <input type="text"
                           className="form-control"
                           id="answer3"
                           name="answer3"
                           placeholder="answer3"
                           required
                           onChange={handleChange}
                    />
                </div>
                    <div className="form-group">
                    <label htmlFor="answer4">Answer 4</label>
                    <input type="text"
                           className="form-control"
                           id="answer4"
                           name="answer4"
                           placeholder="answer4"
                           required
                           onChange={handleChange}
                    />
                </div>
                    <div className="form-group">
                        <label>Choose which answer is correct</label>
                        <select name="answerCorrect" className="form-control" onChange={handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionSingleCreate;
