import { useState } from "react";
import FriendContext from "./friendContext";
import { decrypt } from 'n-krypta';
import Swal from 'sweetalert2';

const FriendState = (props) => {

  const Host = "https://notebookserver.onrender.com";
  // const Host = "http://localhost:5000"


  const notesInitial = [];

  const [friends, setFriends] = useState(notesInitial);
  const [friendDetails, setfriendDetails] = useState(notesInitial);
  

  
  // Accept Friend Request

  const acceptFriendReq = async (reqId) => {
      const url = `${Host}/api/friends/acceptRequest/${reqId}`
      const user2email = decrypt(localStorage.getItem('key'), Host);  // decrypting user email
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({user2email}),
        });
        const json = await response.json();
        if (json.success) {
            setFriends(friends.concat(json));
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Acceped',
              showConfirmButton: false,
              timer: 1000
            })
          }
          else {
            Swal.fire({
              position: 'top',
              icon: 'warning',
              title: 'Sorry! Internal server error',
              showConfirmButton: false,
              timer: 1500
            })
          }        
    }
    
   // Get all Friends
    const getFriends = async () => {
      const url = `${Host}/api/friends/fetchFriends`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setFriends(json)
    }



    const getFriendDetails = async (friendId) => {
      const url = `${Host}/api/friends/getFriend/${friendId}`
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        localStorage.setItem('friendshipToken', json.friendshipToken);
        setfriendDetails(json.friend);
        }



//   // Unfriend
  const Unfriend = async () => {
    const url = `${Host}/api/friends/unfriend`
       
    const response = await fetch(url, {                 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "friendshipToken": localStorage.getItem('friendshipToken')
      },

    }); 
    const json = await response.json();
    if (json.success) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Unfriended',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }



  return (
    <FriendContext.Provider value={{acceptFriendReq, getFriends, getFriendDetails, Unfriend, friends, friendDetails}}>
      {props.children}
    </FriendContext.Provider>
  )
}

export default FriendState;