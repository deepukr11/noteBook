import { useState } from "react";
import UserContext from "./userContext";
import {decrypt} from 'n-krypta';

const UserState = (props) => {

  const Host = "https://notebookserver.onrender.com";


  const [User, setUser] = useState({ id: "", name: "", email: "", date: "" });
  

  // Get User Detailes
  const getUser = async () => {
    const url = `${Host}/api/auth/getuser`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    const key=decrypt(localStorage.getItem('key'), Host)
    // decrypting User data
    const decrypted_name = decrypt( json.name, key);
    const decrypted_email = decrypt( json.email, key);
    setUser({id: json._id, name: decrypted_name, email: decrypted_email, date: json.date})
  }

  
  return (
    <UserContext.Provider value={{ getUser, User}}>
      {props.children}
    </UserContext.Provider>
  )
} 

export default UserState;
