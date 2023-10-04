import React, { useContext } from 'react'
import friendContext from '../../context/friends/friendContext'
import { useHistory } from "react-router-dom";
import { decrypt } from 'n-krypta';
import profile from '../../image/profile.jpg';
import Swal from 'sweetalert2';

const FriendItems = (props) => {

    const friend = props.friend;

    let history = useHistory();

    const friendContextValu = useContext(friendContext);


    const { Unfriend } = friendContextValu;
    

    let name = "";
    if (localStorage.getItem('Id') === friend.user1) {
        if (friend.name2 && friend.user2) {
            name = decrypt(friend.name2, friend.user2);
        }
    }
    else {
        if (friend.name1 && friend.user1) {
            name = decrypt(friend.name1, friend.user1);
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
                Unfriend(friend._id);
                history.push("/friends");
            }
        })

    }



    return (
        <div className='col-md-4'>
            <div className="request-color">Friend</div>
            <div className="card ">
                <div className="ms-2">
                    <img src={profile} width="100" height="140" alt="Profile" />
                    <strong><strong></strong>{name}</strong>
                </div>
                <div className="date ms-1">{new Date(friend.date).toGMTString()}
                </div>
            </div>
            <div className="modal-footer mt-1">
                <button onClick={handleUnfriend} className="btn btn-outline-danger rounded-circle mt-1" title='Unfriend' type="submit"><strong>Unfriend</strong></button>
                <button title="Friend detailes" className="btn btn-dark ms-auto fa-beat rounded-circle"><strong>Message</strong></button>
            </div>
        </div>
    )
}

export default FriendItems
