import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import requestContext from '../../context/requests/requestContext';
import ReceivedReqItems from './ReceivedReqItems';

const ReceivedRequests = () => {

  let history = useHistory();
    if (!localStorage.getItem('token')) {
        history.push("/");
    }
    localStorage.removeItem('findBE');
    localStorage.removeItem('viewFriendProfile');
    localStorage.removeItem('friendshipToken');
    
    let key =0;
    const requestContentValue = useContext(requestContext);
    
    const {getReceivedRequests, receivedRequest } = requestContentValue;
    
    useEffect(() => {
      getReceivedRequests();
        // eslint-disable-next-line
    }, [])

  return (
    <section className="vh-100">
            <div className='login-bg-img Buttoncolor container'>
                    <br /><br /><br />
                 <div className="container">
                <div className=" row  ">

                    <h2 className='container Buttoncolor'><strong>Confirm Request{receivedRequest.length > 1 && `s`}</strong></h2>
                    <div className='container '></div>
                    <div className="container ms-3 mt-3">
                        {receivedRequest.length === 0 && `No Request to Display`}
                    </div>
                    {receivedRequest.map((request) => {                        
                        return <ReceivedReqItems key={key++} request={request} />                       

                    })}
                </div>
                </div>
            </div>
        </section>
  )
}

export default ReceivedRequests
