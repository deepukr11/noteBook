import { useState } from "react";
import MsgContext from "./msgContext";


const MsgState = (props) => {

  // const Host = "https://notebookserver.onrender.com";
  const Host = "http://localhost:5000"


  const [chatProfile, setChatProfile] = useState({chatID: "", chatName: "", profilePhoto: "", isGroup: false});
  const [chatDetails, setChatDetails] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [newmessage, setNewmessage] = useState("");

  // Get Messages
  const getMessages = async (chatID) => {
    const url = `${Host}/api/messages/fetchMessages/${chatID}`;
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

  // Send Message
  const sendMessage = async (chatID, text) => {
    const url = `${Host}/api/messages/sendMessage`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ chatID, text}),
    });
    // eslint-disable-next-line
    const json = await response.json();
  }

  // Delete message
  const deleteMessage = async (id) => {
    const url = `${Host}/api/messages/deleteMessage/${id}`       
    const response = await fetch(url, {                 
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token')
      },

    });
    // eslint-disable-next-line   
    const json = await response.json();
  }

  // Edit message
  const editMessage = async (id, text) => {
    const url = `${Host}/api/messages/editMessage/${id}` 
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({text}),
    });
    // eslint-disable-next-line   
    const json = await response.json();
  }

  return (
    <MsgContext.Provider value={{
        setChatProfile, chatProfile,
        setChatDetails, chatDetails,
        getMessages,
        sendMessage,
        deleteMessage,
        editMessage,
        setNewmessage, newmessage
        }}>
      {props.children}
    </MsgContext.Provider>
  )
}

export default MsgState;