import React from 'react';
import {useNavigate} from 'react-router-dom';
import StudyPrepService from "../../repository/StudyPrepRepository";

const Login = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        // const username = formData.username;
        // const password = formData.password;
        //
        // props.onLogin()
        // history("admin")
        StudyPrepService.login(formData.username, formData.password).then(resp => {
            console.log(resp.data)
            localStorage.setItem("UserId", resp.data.userId);
            localStorage.setItem("Username", resp.data.username);
            localStorage.setItem("Email", resp.data.email);
            localStorage.setItem("Userrole", resp.data.userRole);
            props.onLogin()
            history("/quizzes");
        })
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <input type="text"
                               className="form-control"
                               name="username"
                               required
                               placeholder="Enter username"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Password</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               placeholder="Enter password"
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

export default Login;
