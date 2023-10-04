import React, { useContext, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import userContext from '../../context/users/userContext';
import requestContext from '../../context/requests/requestContext';
import friendContext from '../../context/friends/friendContext';
import { encrypt } from 'n-krypta';
import Swal from 'sweetalert2';
import profile from '../../image/profile.jpg';

const ViewUser = () => {
    let history = useHistory();

    if (!localStorage.getItem('token')) {
        history.push("/");
    }
    else if (!localStorage.getItem('viewFriendProfile')) {
        history.push("/findFriendByEmail");
    }
    localStorage.removeItem('friendshipToken');

    const contextValue = useContext(userContext);
    const requestContentValue = useContext(requestContext);
    const friendContextValu = useContext(friendContext);

    const { findUser } = contextValue;
    const { sendRequest, cancelRequest, ignoreRequest } = requestContentValue;
    const { acceptFriendReq, getFriendDetails } = friendContextValu;
    

    const [relation, setRelation] = useState(findUser.relation);

    const handleSendRequest = async (e) => {
        e.preventDefault();
        let friendEmail = "";
        let findName = "";
        if (findUser.email) {
            friendEmail = encrypt(findUser.email, findUser.id);  // encrypt friendEmail
            findName = encrypt(findUser.name, findUser.id);
        }
        sendRequest(findUser.id, friendEmail, findName);  // sent Request to friend
        setRelation("Requested");
    }

    const handleCancelRequest = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Cancel this Request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelRequest(findUser.reqfrndId);
                if (localStorage.getItem('findBE')) {
                    history.push("/findFriendByEmail");
                }
                else {
                    history.push("/findFriendById");
                }
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Cancelled Request',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        })
    }

    const handleIgnoreRequest = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Ignore this Request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Ignore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                ignoreRequest(findUser.reqfrndId);
                if (localStorage.getItem('findBE')) {
                    history.push("/findFriendByEmail");
                }
                else {
                    history.push("/findFriendById");
                }
                // props.showAlert("Deleted Successfully", "danger");
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Ignored Request',
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        })
    }

    const handleAcceptRequest = (e) => {
        e.preventDefault();
        acceptFriendReq(findUser.reqfrndId); // accept friend request
        ignoreRequest(findUser.reqfrndId);  // and delete request
        if (localStorage.getItem('findBE')) {
            history.push("/findFriendByEmail");
        }
        else {
            history.push("/findFriendById");
        }
    }

    const handleViewFriend = async()=>{
        await getFriendDetails(findUser.reqfrndId);        
        history.push("/friendDetails");
    }



    return (
        <div>
            <div className='login-bg-img'>
                <section className="vh-100" >
                    <div className="mb-3">"</div>
                    {localStorage.getItem('findBE') ?  // when searched by email
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
                                {relation === "Follow" ?
                                    <div className="modal-footer my-3">
                                        <button title="Send Rquest" onClick={handleSendRequest} className=" btn btn-outline-light ms-auto rounded-circle"><strong>{relation}</strong></button>
                                    </div>
                                    : <div>
                                        {relation === "Accept" ?
                                            <div className="modal-footer mt-1">
                                                <button onClick={handleIgnoreRequest} className="btn btn-outline-light mt-1" title='Ignore Request' type="submit"><strong>Ignore</strong></button>
                                                <button title="Accept Friend" onClick={handleAcceptRequest} className="btn btn-dark ms-auto rounded-circle"><strong>{relation}</strong></button>
                                            </div>
                                            : <div >
                                                {relation === "Friend" ?
                                                    <div className="modal-footer mt-1">
                                                        <button title="Friend detailes" onClick={handleViewFriend} className="btn btn-dark ms-auto rounded-circle"><strong>View Friend</strong></button>
                                                    </div>
                                                    : <div >
                                                        {relation === "Requested" ?
                                                            <div className="modal-footer mt-1">
                                                                {findUser.reqfrndId ?
                                                                    <button onClick={handleCancelRequest} className="btn btn-primary mt-1" title='Cancel Request' type="submit"><strong>Cancel</strong></button>
                                                                    : ""}
                                                                <button disabled title="Rquested" onClick={handleSendRequest} className=" btn btn-outline-light ms-auto rounded-circle"><strong>{relation}</strong></button>

                                                            </div>
                                                            : <div >
                                                                {relation === "View" ?
                                                                    <div className="modal-footer my-3">
                                                                        <Link title="View Profile" className="btn btn-outline-light ms-auto rounded-circle" to="/profile" role="button"><strong>{relation}</strong></Link>
                                                                    </div>
                                                                    : ""}
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        // when searched by ID
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
                                {relation === "Follow" ?
                                    <div className="modal-footer my-3">
                                        <button title="Send Rquest" onClick={handleSendRequest} className=" btn btn-outline-light ms-auto rounded-circle"><strong>{relation}</strong></button>
                                    </div>
                                    : <div>
                                        {relation === "Accept" ?
                                            <div className="modal-footer mt-1">
                                                <button onClick={handleIgnoreRequest} className="btn btn-outline-light mt-1" title='Ignore Request' type="submit"><strong>Ignore</strong></button>
                                                <button title="Accept Friend" onClick={handleAcceptRequest} className="btn btn-dark ms-auto rounded-circle"><strong>{relation}</strong></button>
                                            </div>
                                            : <div >
                                                {relation === "Friend" ?
                                                    <div className="modal-footer mt-1">
                                                        <button title="Friend detailes" onClick={handleViewFriend} className="btn btn-dark ms-auto rounded-circle"><strong>View Friend</strong></button>
                                                    </div>
                                                    : <div >
                                                        {relation === "Requested" ?
                                                            <div className="modal-footer mt-1">
                                                                {findUser.reqfrndId ?
                                                                    <button onClick={handleCancelRequest} className="btn btn-primary mt-1" title='Cancel Request' type="submit"><strong>Cancel</strong></button>
                                                                    : ""}
                                                                <button disabled title="Rquested" onClick={handleSendRequest} className=" btn btn-outline-light ms-auto rounded-circle"><strong>{relation}</strong></button>

                                                            </div>
                                                            : <div >
                                                                {relation === "View" ?
                                                                    <div className="modal-footer my-3">
                                                                        <Link title="View Profile" className="btn btn-outline-light ms-auto rounded-circle" to="/profile" role="button"><strong>{relation}</strong></Link>
                                                                    </div>
                                                                    : ""}
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </section>
            </div>
        </div>
    )
}

export default ViewUser
