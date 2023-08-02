import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  
  const Host = "https://notebookserver.onrender.com";
  let history = useHistory();
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credential;
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
      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Account Created Successfully", "success");
        history.push("/notes");
      }
      else if(json.already){
        props.showAlert("This Email Already Register.", "danger");
      }
      else { 
        props.showAlert("Invalid Details", "danger");
      }
    }
    else {
      props.showAlert("Confirm Password Not Match", "danger");
    }
      
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className='my-3 '><strong>Sign-up Form</strong></h3>
        <div className="mb-3 mx-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label"><strong>Name</strong></label>
          <input type="text" className="form-control" onChange={onChange} id="name" value={credential.name} name="name" required aria-describedby="emailHelp" />

        </div>
        <div className="mb-3 mx-3">
          <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
          <input type="email" className="form-control" onChange={onChange} id="email" value={credential.email} name="email" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 mx-3">
          <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
          <input type="password" className="form-control" onChange={onChange} id="password" value={credential.password} name="password" minLength={5} required />
        </div>
        <div className="mb-3 mx-3">
          <label htmlFor="exampleInputPassword1" className="form-label"><strong>Conform Password</strong></label>
          <input type="password" className="form-control" onChange={onChange} id="cpassword" value={credential.cpassword} name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-success mx-5 my-3">Signup</button>
      </form>
    </div>
  )
}

export default Signup
