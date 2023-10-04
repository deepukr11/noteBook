import { useState } from "react";
import UserContext from "./userContext";
import { decrypt } from 'n-krypta';
import Swal from 'sweetalert2';
import profile from '../../image/profile.jpg'



const UserState = (props) => {

  // const Host = "https://notebookserver.onrender.com";
  const Host = "http://localhost:5000"


  const [myProfileDetails, setMyProfileDetails] = useState({userId: "", 
                                                             name: "", 
                                                             email: "",  
                                                             date: "", 
                                                             profilePhoto: "" ,
                                                             relation: "myProfile"});

  const [findUser, setFindUser] = useState({ success: false, relation: "", reqfrndId: "", id: "", name: "", email: "" });

  const [userName, setUserName] = useState ("");

  const successChange = ()=>{
    setFindUser ({success: false})
  }

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
    const key = decrypt(localStorage.getItem('key'), Host);
    // decrypting User data
    const decrypted_name = decrypt(json.name, key);
    const decrypted_email = decrypt(localStorage.getItem('key'), Host);
    localStorage.setItem('Id', json._id);
    setMyProfileDetails({ 
                          userId: json._id,
                          name: decrypted_name, 
                          email: decrypted_email, 
                          date: json.date,
                          profilePhoto: profile,
                          type: "myProfile"
                           });
  }

  // Find User By Registered Id
  const findUserById = async (id) => {
    const url = `${Host}/api/user/findUserById`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ id }),
    });

    const json = await response.json();
    if (json.success) {
      setFindUser({ success: json.success, relation: json.relation, reqfrndId: json.reqfrndId, id: json.user._id });
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'User Found Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Sorry! User Not Found',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  // Find User By Registered Email
  const findUserByEmail = async (email) => {
    const url = `${Host}/api/user/findUserByEmail`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();
    if (json.success) {
      await setFindUser({ success: json.success, relation: json.relation, reqfrndId: json.reqfrndId, id: json.findId, name: json.name, email: json.email });
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'User Found Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Sorry! User Not Found',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

   // Find User By Registered Id
   const findUserName = async (id, email) => {
    const url = `${Host}/api/user/findUserName/${id}`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({email}),
    });

    const json = await response.json();
    if (json.success) {
      setUserName(json.name);
    }
  }


 

  return (
    <UserContext.Provider value={{ getUser, findUserById, findUserByEmail, findUserName, myProfileDetails, findUser, userName, successChange}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;
