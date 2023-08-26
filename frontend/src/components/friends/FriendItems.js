import React, { useContext } from 'react'
import userContext from '../../context/users/userContext';
import friendContext from '../../context/friends/friendContext'
import { useHistory } from "react-router-dom";
import { decrypt } from 'n-krypta';
import profile from '../../image/profile.jpg';

const FriendItems = (props) => {

    const friend = props.friend;

    let history = useHistory();

    const contextValue = useContext(userContext);
    const friendContextValu = useContext(friendContext);

    const { findUserName, userName } = contextValue;
    const { getFriendDetails } = friendContextValu;

    let userEmail = "";

    if(localStorage.getItem('Id') === friend.user1){
        if(friend.user2 && friend.user2e){
        userEmail = decrypt(friend.user2e, friend.user2);
        findUserName(friend.user2, userEmail);
        }
    }
    else{        
        if(friend.user1 && friend.user1e){
            userEmail = decrypt(friend.user1e, friend.user1);
            findUserName(friend.user1, userEmail);
        }
    }

    const handleViewFriend = async()=>{
        await getFriendDetails(friend._id);
        
        history.push("/friendDetails");
    }

   

  return (
    <div className='col-md-4'>
        <div className="request-color">Friend</div>
            <div className="card ">
                <div className="ms-2">
                    <img src={profile} width="100" height="140" alt="Profile" />
                    <strong><strong></strong>{userName}</strong>
                </div>
                <div className="date ms-1">{new Date(friend.date).toGMTString()}
                </div>
            </div>
            <div className="modal-footer mt-1">
                <button title="Friend detailes" onClick={handleViewFriend} className="btn btn-dark ms-auto rounded-circle"><strong>View Profile</strong></button>
            </div>
        </div>
  )
}

export default FriendItems
