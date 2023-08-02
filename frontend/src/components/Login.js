import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const Host = process.env.REACT_APP_HOST;
    let history = useHistory();
    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = `${Host}/api/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully", "success" )
            history.push("/notes");
        }
        else if(json.servererr){
            props.showAlert("Internal server error", "danger" );
        }
        else {
            props.showAlert("Invalid Credentials", "danger" );
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3 className='my-3 '><strong>Login Form</strong></h3>
                <div className="mb-3 mx-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
                    <input type="email" className="form-control" onChange={onChange} name='email' required value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3 mx-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                    <input type="password" className="form-control" name='password' required onChange={onChange} value={credential.password} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-success mx-5 my-3" >Login</button>
            </form>
        </div>
    )
}

export default Login
