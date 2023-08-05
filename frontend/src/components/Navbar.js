import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


const Navbar = (props) => {
  //   

  let history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    props.setProgress(40);
    localStorage.removeItem('token');
    localStorage.removeItem('key');
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Logged Out',
      showConfirmButton: false,
      timer: 1800
    })
    props.setProgress(80);
    if (location.pathname === "/") {
      history.push("/");
      props.setProgress(90);
      window.location.reload();     // reload the page
      props.setProgress(100);
    } else {
      props.setProgress(90);
      history.push("/");
      props.setProgress(100);
    }
  }
  
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><strong>NoteBook</strong></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>


            {localStorage.getItem('token') ?
              <div >

                <ul className="navbar-nav Buttoncolor mb-lg-0">
                        <li className="nav-item"> <Link className="btn fa-solid fa-user  fa-xl" to="/profile" role="button" /> </li>
                           <div className="my-2"></div>
                         <li className="nav-item"> <button onClick={handleLogout} className="btn fa-solid fa-right-from-bracket fa-lg  text-danger" /> 
                         </li>
                 </ul>
                
              </div>
              : location.pathname === "/" ? "" :
                <form className="d-flex" >
                  {location.pathname === "/login" ? "" : <Link className="btn btn-outline-light fa-beat" to="/login" role="button"><strong>Login</strong></Link>}
                  <div className="mx-3"></div>
                  {location.pathname === "/signup" ? "" : <Link className="btn btn-outline-light fa-beat" to="/signup" role="button"><strong>Signup</strong></Link>}
                  <div className="mx-2"></div>
                </form>

            }

          </div>
        </div>
      </nav>

    </div>

  )
}

export default Navbar
