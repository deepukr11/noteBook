import React, { useState, useContext } from 'react'
import userContext from '../../context/users/userContext';
import { useHistory} from 'react-router-dom';
import Swal from  'sweetalert2';
import {encrypt} from 'n-krypta';

const Login = (props) => {

    // const Host = "https://notebookserver.onrender.com";
    const Host = "http://localhost:5000"
    
    let history = useHistory();
    const contextValue = useContext(userContext);
    const { getUser } = contextValue;
    
    const [credential, setCredential] = useState({ email: "", password: "" });
    const { email, password} = credential;

    const handleLogin = async (e) => {
        props.setProgress(25);
        e.preventDefault();
        props.setProgress(60);
        const url = `${Host}/api/auth/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({email,password }),
        });
        props.setProgress(65);
        const json = await response.json();
        props.setProgress(70);
        if (json.success) {
            // save the auth token and encryption key in localStorage and redirect
            localStorage.setItem('token', json.authToken);
            const key = encrypt(email, Host);
            localStorage.setItem('key', key);
            props.setProgress(80);
            getUser();
            // showAlert("Logged in Successfully", "success" );
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Logged in Successfully',
                showConfirmButton: false,
                timer: 2000
              })
            props.setProgress(90);
            history.push("/");
            props.setProgress(100);
        }
        else if(json.servererr){
            await props.setProgress(90);
            // showAlert("Internal server error", "danger" );
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Internal Server Error',
                showConfirmButton: false,
                timer: 2000
              })
            props.setProgress(100);
        }
        else {
            await props.setProgress(90);
            // showAlert("Invalid Credentials", "danger" );
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Invalid Credentials',
                text: "Please try with correct Credentials",
                showConfirmButton: false,
                timer: 2000
              })
            props.setProgress(100);
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
        {localStorage.getItem('token') ?
        history.push("/")
        :
        <section className="vh-100" >
        <div className='login-bg-img text container'>
            <div className=' d-flex justify-content-center'>
            <form onSubmit={handleLogin}>
                <br /><br /><br />
                <div className="container ">
                <h3 className='mt-5 mb-4'><strong>Login Form</strong></h3>                
                <div className="container mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label "><strong>Email Address:</strong></label>
                    <input type="email" className="form-control width " onChange={onChange} name='email' required value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text">We'll never share your email with anyone else.</div>
                </div>
                <div className="container mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password:</strong></label>
                    <input type="password" className="form-control width" name='password' required onChange={onChange} value={credential.password} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn  btn-outline-light mx-5 my-3 mb-4" >Login</button>
                </div>
            </form>
            </div>
        </div>
        </section>}
        </>
    )
}

export default Login
