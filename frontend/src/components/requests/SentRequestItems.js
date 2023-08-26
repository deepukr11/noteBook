import React, { useContext } from 'react'
import { decrypt } from 'n-krypta';
import userContext from '../../context/users/userContext';
import requestContext from '../../context/requests/requestContext';
import profile from '../../image/profile.jpg';
import Swal from 'sweetalert2';


const SentRequestItems = (props) => {

    const user = props.request;

    const contextValue = useContext(userContext);
    const requestContentValue = useContext(requestContext);

    const { findUserName, userName } = contextValue;

    const { cancelRequest } = requestContentValue;


    let userEmail = user.user2e;
    if (user.user2e) {
        userEmail = decrypt(user.user2e, user.user2);
        findUserName(user.user2, userEmail);
    }

    const handleCancelRequest = () => {
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
                cancelRequest(user._id);
                // props.showAlert("Deleted Successfully", "danger");
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

    return (
        <div className='col-md-4 mt-3'>
            <div className="request-color"> Requested</div>
            <div className="card">
                <div className="ms-2">
                    <img src={profile} width="100" height="140" alt="Profile" />
                    {user.user2e ?  // when searched by email
                        <strong><strong></strong>{userName}</strong>
                        :
                        <strong><strong>User ID: </strong>{user.user2}</strong>
                    }
                </div>
                <div className="date">{new Date(user.date).toGMTString()}
                </div>
            </div>
            <button onClick={handleCancelRequest} className="btn btn-primary mt-1" title='Cancel Request' type="submit"><strong>Cancel</strong></button>
        </div>
    )
}

export default SentRequestItems
