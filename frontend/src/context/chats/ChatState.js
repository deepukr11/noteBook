
import ChatContext from "./chatContext";


const ChatState = (props) => {

  // const Host = "https://notebookserver.onrender.com";
  const Host = "http://localhost:5000"

// Get all Chats
  const getChats = async () => {
    const url = `${Host}/api/chats/fetchChats`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    return json;
  }

// create New Chat with friend
  const createNewChat = async (friendID) => {
    const url = `${Host}/api/chats/createChat`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({friendID}),
    }); 
    const json = await response.json();
    return json.chatID;
  }


  // create new group chat 
  const createGroupChat = async (usersID, usersName, groupName) => { 
    const url = `${Host}/api/chats/createGroupChat`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({usersID, usersName, groupName}),
    }); 
    const json = await response.json();
    return json.groupChat;
  }


//   // Delete Note
//   const deleteNote = async (id) => {
//     const url = `${Host}/api/notes/deletenote/${id}`
       
//     const response = await fetch(url, {                 
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem('token')
//       },

//     });
//     const newNotes = notes.filter((note) => { return note._id !== id });
//     // eslint-disable-next-line   
//     const json = await response.json();
//     setNote(newNotes);
//   }



//   // Edit Note
//   const editNote = async (id, title, description, tag) => {
//     const url = `${Host}/api/notes/updatenote/${id}`   
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem('token')
//       },

//       body: JSON.stringify({title, description, tag}),
//     });
//     // eslint-disable-next-line   
//     const json = await response.json();

//      let newNote = JSON.parse(JSON.stringify(notes))
     
//     for (let index = 0; index < newNote.length; index++) {
//       const element = newNote[index];
//       if (element._id === id) {
//         newNote[index].title = title;
//         newNote[index].description = description;
//         newNote[index].tag = tag;
//         break;
//       }
//     }
//     setNote(newNote);
//   }



  return (
    <ChatContext.Provider value={{getChats,
                                  createNewChat,
                                  createGroupChat
                                  
                                   }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatState;