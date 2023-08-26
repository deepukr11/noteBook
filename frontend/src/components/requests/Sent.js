import React, { useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import requestContext from '../../context/requests/requestContext';
import SentRequestItems from './SentRequestItems';

const Sent = () => {

    let history = useHistory();
    if (!localStorage.getItem('token')) {
        history.push("/");
    }

    localStorage.removeItem('findBE');
    localStorage.removeItem('viewFriendProfile');
    localStorage.removeItem('friendshipToken');
    
    let key =0;
    const requestContentValue = useContext(requestContext);
    
    const {getSentRequests, senderRequest } = requestContentValue;
    
    useEffect(() => {
        getSentRequests();
        // eslint-disable-next-line
    }, [])

    return (
        <section className="vh-100">
            <div className='login-bg-img Buttoncolor container'>
                    <br /><br /><br />
                 <div className="container">
                <div className=" row  ">

                    <h2 className='container Buttoncolor'><strong>Your Request{senderRequest.length > 1 && `s`}</strong></h2>
                    <div className='container '></div>
                    <div className="container ms-3 mt-3">
                        {senderRequest.length === 0 && `No Your Request to Display`}
                    </div>

                    {senderRequest.map((request) => {                        
                        return <SentRequestItems key={key++} request={request} />

                    })}
                </div>
                </div>
            </div>
        </section>

    )
}

export default Sent
