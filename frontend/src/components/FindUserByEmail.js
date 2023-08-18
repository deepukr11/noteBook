import React, { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import userContext from '../context/users/userContext';
import profile from '../image/profile.jpg';




const FindUserByEmail = () => {

    let history = useHistory();
    const contextValue = useContext(userContext);

    const { findUserByEmail, findUser, successChange } = contextValue;

    const [findEmail, setFindEmail] = useState({ email: "" });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            successChange();
        }
        else {
            history.push("/");
        }
        // eslint-disable-next-line
    }, [])

    const handleSearchByEmail = async (e) => {
        e.preventDefault();
        await findUserByEmail(findEmail.email);
    }

    const onChange = (e) => {
        setFindEmail({ ...findEmail, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='login-bg-img'>
                <section className="vh-100" >
                    <div className="mb-3">"</div>
                    {findUser.success ?                    
                            <div className="row d-flex justify-content-center align-items-center mt-5 container">
                                <div className="modal-footer my-2">
                                    <Link title="See Your Notes" className=" btn btn-outline-light ms-auto rounded-circle" to="/notes"><strong>Your Notes</strong></Link>
                                </div>
                                <div className="col col-md-9 col-lg-7 col-xl-5">
                                    <div className="card " >
                                        <div className="d-flex justify-content-center align-items-center mt-2">
                                            <strong><strong>{findUser.name}</strong></strong>
                                        </div>
                                        <div className='ms-1'>
                                            <img src={profile} width="100" height="140" alt="Profile" />
                                            {findUser.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                        <div>
                            <div className="modal-footer mt-4 container">
                                <Link title="Search User ID" className="btn btn-outline-light ms-auto mt-5" to="/findUserById">Search By User ID</Link>
                            </div>
                            <form onSubmit={handleSearchByEmail}>
                                <div className="container ">
                                    <div className="container text">
                                        <h3 ><strong>Search By Email</strong></h3>
                                        <div className="container mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label "><strong>Email Address:</strong></label>
                                            <input type="email" className="form-control width " onChange={onChange} name='email' required value={findEmail.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <div id="emailHelp" className="form-text text">We'll never share email with anyone else.</div>
                                            <button type="submit" className="btn  btn-outline-light  my-3 mb-4" >Search</button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>

                    }
                </section>
            </div>
        </div>
    )
}

export default FindUserByEmail
