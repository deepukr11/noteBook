import React, { useContext, useEffect } from 'react';
import userContext from '../../context/users/userContext';
import ProfileItems from './ProfileItems';
import { useHistory } from 'react-router-dom';


const Profile = () => {

  const contextValue = useContext(userContext);
  let history = useHistory();
  const { getUser } = contextValue;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('findBE');
      localStorage.removeItem('viewFriendProfile');
      localStorage.removeItem('friendshipToken');
      getUser();
    }
    else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <ProfileItems />

    </div>

  )
}

export default Profile
