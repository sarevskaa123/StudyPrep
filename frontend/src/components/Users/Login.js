import React from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const history = useNavigate();
    const [formData, updateFormData] = React.useState({
        email: "",
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
        const email = formData.email;
        const password = formData.password;

        props.onLogin(email,password);
        history("/");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
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
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
