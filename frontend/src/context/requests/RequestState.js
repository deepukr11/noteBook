import { useState } from "react";
import RequestContext from "./requestContext";
import {decrypt } from 'n-krypta';
import Swal from 'sweetalert2';



const RequestState = (props) => {

  const Host = "https://notebookserver.onrender.com";
  // const Host = "http://localhost:5000"


  const notesInitial = [];

  const [senderRequest, setsenderRequest] = useState(notesInitial);
  
  const [receivedRequest, setReceivedRequest] = useState(notesInitial);


  // send Request
  const sendRequest = async (user2, user2e) => {
    const url = `${Host}/api/requests/sendRequest`
    const user1email = decrypt(localStorage.getItem('key'), Host);  // decrypting user email
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ user2, user1email, user2e }),
    });
    const json = await response.json();
    if (json.success) {
        setsenderRequest(senderRequest.concat(json));
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Request Sent Successfully',
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


   // Get Sent Requests
   const getSentRequests = async () => {
    const url = `${Host}/api/requests/fetchSenderRequest`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setsenderRequest(json)
  }



  // Get Received Requests
  const getReceivedRequests = async () => {
    const url = `${Host}/api/requests/fetchReceiverRequest`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setReceivedRequest(json);
  }



  // cancel request

  const cancelRequest = async (id) => {
    const url = `${Host}/api/requests/cancelRequest/${id}`
       
    const response = await fetch(url, {                 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const requests = senderRequest.filter((request) => { return request._id !== id });
    // eslint-disable-next-line   
    const json = await response.json();
    setsenderRequest(requests);
  }

  // ignore request

  const ignoreRequest = async (id) => {
    const url = `${Host}/api/requests/cancelRequest/${id}`
       
    const response = await fetch(url, {                 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const requests = receivedRequest.filter((request) => { return request._id !== id });
    // eslint-disable-next-line   
    const json = await response.json();
    setReceivedRequest(requests);
  }



 


  return (
    <RequestContext.Provider value={{sendRequest, getSentRequests, getReceivedRequests, senderRequest, receivedRequest, cancelRequest, ignoreRequest }}>
      {props.children}
    </RequestContext.Provider>
  )
}

export default RequestState;
