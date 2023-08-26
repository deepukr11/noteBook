import React, { useContext } from 'react'
import userContext from '../../context/users/userContext';
import friendContext from '../../context/friends/friendContext'
import { useHistory } from "react-router-dom";
import { decrypt } from 'n-krypta';
import profile from '../../image/profile.jpg';
import Swal from 'sweetalert2';

const ViewFriendDetailes = () => {

    let history = useHistory();

    if (!localStorage.getItem('token')) {
        history.push("/");
    }

    localStorage.removeItem('findBE');
    localStorage.removeItem('viewFriendProfile');

    const contextValue = useContext(userContext);
    const friendContextValu = useContext(friendContext);

    const { findUserName, userName } = contextValue;
    const { friendDetails, Unfriend } = friendContextValu;

    let userEmail = "";
    if (localStorage.getItem('Id') === friendDetails.user1) {
        if (friendDetails.user2 && friendDetails.user2e) {
            userEmail = decrypt(friendDetails.user2e, friendDetails.user2);
            findUserName(friendDetails.user2, userEmail);
        }
    }
    else {
        if (friendDetails.user1 && friendDetails.user1e) {
            userEmail = decrypt(friendDetails.user1e, friendDetails.user1);
            findUserName(friendDetails.user1, userEmail);
        }
    }

    const handleUnfriend = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Unfriend!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Unfriend it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Unfriend();
                history.push("/friends");
            }
        })

    }


    return (
        <div>{!localStorage.getItem('friendshipToken') ?
            history.push("/")
            :
            <div>
                <section className="vh-100">
                    <div className='login-bg-img Buttoncolor container'>
                        <br /><br /><br />
                        <div className="container">
                            <div className='col-md-4 mt-3'>
                                <div className="card ">
                                    <p className='ms-auto me-1'><strong></strong>{userEmail}</p>
                                    <div className="ms-2">
                                        <img src={profile} width="100" height="140" alt="Profile" />
                                        <strong><strong></strong>{userName}</strong>
                                    </div>
                                    <div className="date ms-1">{new Date(friendDetails.date).toGMTString()}
                                    </div>
                                </div>
                                <div className="modal-footer mt-1">
                                <button onClick={handleUnfriend} className="btn btn-outline-danger rounded-circle mt-1" title='Unfriend' type="submit"><strong>Unfriend</strong></button>
                                    <button title="Friend detailes"  className="btn btn-dark ms-auto fa-beat rounded-circle"><strong>Message</strong></button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        }
        </div>
    )
}

export default ViewFriendDetailes
