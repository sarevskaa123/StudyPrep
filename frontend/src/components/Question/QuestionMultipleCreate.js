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
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false

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
        const checked1 = formData.checked1;
        const checked2 = formData.checked2;
        const checked3 = formData.checked3;
        const checked4 = formData.checked4;

        const quizId = props.quiz.quizId;

        props.onQuestionMultipleCreate(questionText, quizId, answer1, answer2, answer3, answer4, checked1, checked2, checked3, checked4);
        history("/admin");
    }

    return (
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
                        <label>Choose which answers are correct</label>
                        <div>1<input type="checkbox" id="checked1" name="checked1" value="true"
                                     onChange={handleChange}/></div>
                        <div>2<input type="checkbox" id="checked2" name="checked2" value="true"
                                     onChange={handleChange}/></div>
                        <div>3<input type="checkbox" id="checked3" name="checked3" value="true"
                                     onChange={handleChange}/></div>
                        <div>4<input type="checkbox" id="checked4" name="checked4" value="true"
                                     onChange={handleChange}/></div>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default QuestionSingleCreate;
