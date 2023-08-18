import React, { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import userContext from '../context/users/userContext';
import profile from '../image/profile.jpg';



const FindUserById = () => {

    let history = useHistory();
    const contextValue = useContext(userContext);
    const { findUserById, findUser, successChange } = contextValue;

    const [findId, setFindId] = useState({ id: "" });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            successChange();
        }
        else {
            history.push("/");
        }
        // eslint-disable-next-line
    }, [])

    const handleSearchById = (e) => {
        e.preventDefault();
        findUserById(findId.id);
    }

    const onChange = (e) => {
        setFindId({ ...findId, [e.target.name]: e.target.value })
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
                                   <div className='ms-2'>
                                    <img src={profile} width="100" height="140" alt="Profile" />
                                    <strong><strong>User ID: </strong>{findUser.id}</strong>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                        :
                        <div>
                            <div className="modal-footer mt-4 container">
                                <Link title="Search User Email" className="btn btn-outline-light mx-5 mt-5" to="/findUserByEmail">Search By Email</Link>
                            </div>
                            <form onSubmit={handleSearchById}>
                                <div className="container">
                                    <div className="container text">
                                        <h3 ><strong>Search By User ID</strong></h3>
                                        <div className="mb-3 mx-3 mt-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label"><strong>User ID:</strong></label>
                                            <input type="text" className="form-control width" onChange={onChange} id="id" value={findId.id} name="id" required aria-describedby="emailHelp" />
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

export default FindUserById
