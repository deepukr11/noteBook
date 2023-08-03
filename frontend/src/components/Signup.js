import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

  const Host = "https://notebookserver.onrender.com";
  let history = useHistory();
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    props.setProgress(25);
    e.preventDefault();
    props.setProgress(60);
    const { name, email, password, cpassword } = credential;
    props.setProgress(65);
    if (password === cpassword) {
      const url = `${Host}/api/auth/createUser`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      props.setProgress(70);
      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.setProgress(80);
        props.showAlert("Account Created Successfully", "success");
        props.setProgress(90);
        history.push("/notes");
        props.setProgress(100);
      }
      else if (json.already) {
        props.setProgress(90);
        props.showAlert("This Email Already Register.", "danger");
        props.setProgress(100);
      }
      else {
        props.setProgress(90);
        props.showAlert("Invalid Details", "danger");
        props.setProgress(100);
      }
    }
    else {
      props.setProgress(90);
      props.showAlert("Confirm Password Not Match", "danger");
      props.setProgress(100);
    }

  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <>{localStorage.getItem('token') ?
    history.push("/")
    :
    <div className='login-bg-img text container'>
      <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit}> <br />
          <h3 className='mt-5 '><strong>Sign-up Form</strong></h3>
          <div className="mb-3 mx-3 mt-3">
            <label htmlFor="exampleInputEmail1" className="form-label"><strong>Name:</strong></label>
            <input type="text" className="form-control width" onChange={onChange} id="name" value={credential.name} name="name" required aria-describedby="emailHelp" />

          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email Address:</strong></label>
            <input type="email" className="form-control width" onChange={onChange} id="email" value={credential.email} name="email" aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password:</strong></label>
            <input type="password" className="form-control width" onChange={onChange} id="password" value={credential.password} name="password" minLength={5} required />
          </div>
          <div className="mb-3 mx-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><strong>Conform Password:</strong></label>
            <input type="password" className="form-control width" onChange={onChange} id="cpassword" value={credential.cpassword} name="cpassword" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-outline-light mx-5 my-3 mb-4">Signup</button>

        </form>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>}
    </>
  )
}

export default Signup
