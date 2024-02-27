import React from 'react';
import {Link} from 'react-router-dom';

const header = (props) => {

    let authenticate
    if (props.user == null) {
        authenticate = (<div><Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
            <Link className="btn btn-outline-info my-2 my-sm-0" to={"/register"}>Register</Link></div>);
    } else {
        authenticate =
            (<div>
                <Link className="btn btn-outline-info my-2 my-sm-0" to={"/profile"}>Profile</Link>
                <button className="btn btn-outline-info my-2 my-sm-0"
                        onClick={() => props.onDelete()}>Logout</button>
            </div>);
    }

    let admin
    if(props.user !== null && props.user.userRole === "ADMIN"){
        <li className="nav-item active">
            <Link className={"nav-link"} to={"/admin"}>Admin</Link>
        </li>
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/">Study prep</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/quizzes"}>Quizzes</Link>
                        </li>
                        {admin}
                       <li className="nav-item active">
                            <Link className={"nav-link"} to={"/admin"}>Admin</Link>
                        </li>
                    </ul>
                    {authenticate}
                    {/*<button className="btn btn-outline-info my-2 my-sm-0">Logout</button>*/}
                    {/*<Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>*/}
                </div>
            </nav>
        </header>
    )
}

export default header;
