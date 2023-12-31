import FriendContext from "./friendContext";
import { decrypt } from 'n-krypta';

const FriendState = (props) => {

  // const Host = "https://notebookserver.onrender.com";
  const Host = "http://localhost:5000"

  const myID = localStorage.getItem('Id');

 
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

      body: JSON.stringify({ user2email }),
    });
    // eslint-disable-next-line
    const json = await response.json();
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
    const friendsData = [];
    // eslint-disable-next-line
    json.map((friend) => {
      let profileDetails = {friendshipID: friend._id, 
                            userID: "", 
                            name: "", 
                            email: "", 
                            date: friend.date, 
                            relation: "friend"};

      if (myID === friend.user1) {
        if (friend.name2 && friend.user2) {
          profileDetails.userID = friend.user2;
          profileDetails.name = decrypt(friend.name2, friend.user2); // decrypt friend name
          if (friend.user2e) {
            profileDetails.email = decrypt(friend.user2e, friend.user2);  // decrypt friend email
          }
          friendsData.push(profileDetails);
        }
      }
      else {
        if (friend.name1 && friend.user1) {
          profileDetails.userID = friend.user1;
          profileDetails.name = decrypt(friend.name1, friend.user1);
          if (friend.user1e) {
            profileDetails.email = decrypt(friend.user1e, friend.user1);  // decrypt friend email
          }
          friendsData.push(profileDetails);
        }
      }
    })
    return friendsData;
  }


  // Unfriend
  const Unfriend = async (friendId) => {
    const url = `${Host}/api/friends/unfriend/${friendId}`

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

    });
    // eslint-disable-next-line
    const json = await response.json();
  }



  return (
    <FriendContext.Provider value={{ acceptFriendReq, 
                                     getFriends, 
                                     Unfriend                                     
                                      }}>
      {props.children}
    </FriendContext.Provider>
  )
}

export default FriendState;