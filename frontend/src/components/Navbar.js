import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  let history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (location.pathname === "/") {
      history.push("/");
      window.location.reload();     // reload the page
    } else {
      history.push("/");
    }
  }
  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><strong>NoteBook</strong></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>

            {localStorage.getItem('token') ? <div className="text-danger">
              <button onClick={handleLogout} className="btn fa-solid fa-right-from-bracket fa-lg  text-danger"/><div>Logout</div></div>
              : location.pathname === "/" ? "" :
                <form className="d-flex" >
                  {location.pathname === "/login" ? "" : <Link className="btn btn-outline-success fa-beat" to="/login" role="button"><strong>Login</strong></Link>}
                  {location.pathname === "/signup" ? "" : <Link className="btn btn-outline-success fa-beat mx-4" to="/signup" role="button"><strong>Signup</strong></Link>}
                </form>
            }

          </div>
        </div>
      </nav>

    </div>
    
  )
}

export default Navbar
