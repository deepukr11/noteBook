import { useState, useContext, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';
import profile from '../../../image/profile.jpg'
import ProfileDrawer from '../../drawer/ProfileDrawer';
import UsersDrawer from '../../drawer/usersDrawer/UsersDrawer';
import userContext from '../../../context/users/userContext';

const Component = styled(Box)`
    height: 55px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    & > * {
        color: #000;
    };
    // & :first-child {
    //     font-size: 22px;
    //     margin-right: 8px;
    //     margin-top: 3px;
    // }
    cursor: pointer;`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%'
});

const ProfileImage = styled(Image)`
cursor: pointer;`;

const Header = () => {

    const userContextValue = useContext(userContext);
    const { getUser, myProfileDetails } = userContextValue;

    const [viewProfile, setViewProfile] = useState(false);
    const [openUserDrawer, setOpenUserDrawer] = useState(false);

    useEffect(() => {        
          getUser();     // get my profile detaile    
        // eslint-disable-next-line
      }, [])

    const toggleDrawer = () => {
        setViewProfile(true);
    }

    const toggleUserDrawer = () => {
        setOpenUserDrawer(true);
    }

    return (
        <>
            <Component>
                <ProfileImage src={profile} alt="Profile" onClick={() => toggleDrawer()} />
                <Wrapper>
                    <MessageIcon onClick={() => toggleUserDrawer()} />
                </Wrapper>
            </Component>
            <ProfileDrawer viewProfile={viewProfile} 
                           setViewProfile={setViewProfile} 
                           profileDetails={myProfileDetails} 
                           profilePhoto={profile}
                           />
            <UsersDrawer openUserDrawer={openUserDrawer} 
                         setOpenUserDrawer={setOpenUserDrawer} />
        </>
    )
}

export default Header
