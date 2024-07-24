import React from 'react';
import {useNavigate} from 'react-router-dom';
import StudyPrepService from "../../repository/StudyPrepRepository";


const Register = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        email:"",
        password: "",
        repeatPassword:""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        try {
            StudyPrepService.register(formData.username, formData.email, formData.password, formData.repeatPassword).then(() => {
                props.onRegister()
                navigate("/"); // Redirect to the home page
            })
        }
        catch (error){
            console.error(error.response.data);
        }
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
                        <label htmlFor="name">Email</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               required
                               placeholder="Enter email"
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
                    <div className="form-group">
                        <label htmlFor="price">Repeat password</label>
                        <input type="password"
                               className="form-control"
                               name="repeatPassword"
                               placeholder="Enter password again"
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

export default Register;
