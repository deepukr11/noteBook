import React, { useContext } from 'react'
import { decrypt } from 'n-krypta';
import userContext from '../../context/users/userContext';
import requestContext from '../../context/requests/requestContext';
import friendContext from '../../context/friends/friendContext';
import profile from '../../image/profile.jpg';
import Swal from 'sweetalert2';


const ReceivedReqItems = (props) => {
    const request = props.request;

    const contextValue = useContext(userContext);
    const requestContextValue = useContext(requestContext);
    const friendContextValu = useContext(friendContext);

    const { findUserName, userName } = contextValue;
    const { ignoreRequest } = requestContextValue;
    const { acceptFriendReq } = friendContextValu;

    const userEmail = decrypt(request.user2e, request.user2);
    findUserName(request.user2, userEmail);

    const handleIgnoreRequest = () => {
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
                ignoreRequest(request._id);
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

    const handleAcceptRequest = () => {
        acceptFriendReq(request._id); // accept friend request
        ignoreRequest(request._id);  // and delete request
    }



    return (
        <div className='col-md-4 mt-3'>
            <div className="card ">
                <div className="ms-2">
                    <img src={profile} width="100" height="140" alt="Profile" />
                    <strong><strong></strong>{userName}</strong>
                </div>
                <div className="date">{new Date(request.date).toGMTString()}
                </div>
            </div>
            <div className="modal-footer mt-1">
                <button onClick={handleIgnoreRequest} className="btn btn-outline-light mt-1" title='Ignore Request' type="submit"><strong>Ignore</strong></button>
                <button title="Accept Friend" onClick={handleAcceptRequest} className="btn btn-dark ms-auto rounded-circle"><strong>Accept</strong></button>
            </div>

        </div>
    )
}

export default ReceivedReqItems
