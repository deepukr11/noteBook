import React, { useContext, useEffect } from 'react'
import FriendItems from './FriendItems'
import friendContext from '../../context/friends/friendContext'
import { useHistory } from "react-router-dom";

const Friends = () => {

    let history = useHistory();
    if (!localStorage.getItem('token')) {
        history.push("/");
    }
    
    localStorage.removeItem('findBE');
    localStorage.removeItem('viewFriendProfile');
    localStorage.removeItem('friendshipToken');
    let key = 0;

    const friendContextValu = useContext(friendContext);
    const { getFriends, friends } = friendContextValu;

    useEffect(() => {
        getFriends();
        // eslint-disable-next-line
    }, [])

    return (
        <section className="vh-100">
            <div className='login-bg-img Buttoncolor container'>
                    <br /><br /><br />
                 <div className="container">
                <div className=" row  ">

                    <h2 className='container Buttoncolor'><strong>Friend{friends.length > 1 && `s`}</strong></h2>
                    <div className='container '></div>
                    <div className="container ms-3 mt-3">
                        {friends.length === 0 && `No Friend to Display`}
                    </div>
                    
                    {
                    friends.map((friend) => {                        
                        return <FriendItems key={key++} friend={friend} />
                        

                    })}
                </div>
                </div>
            </div>
        </section>
    )
}

export default Friends
