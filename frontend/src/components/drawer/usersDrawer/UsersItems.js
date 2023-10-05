import { useState, useContext } from 'react';
import { styled, Box, Typography } from "@mui/material";
import ProfileDrawer from '../ProfileDrawer';
import chatContext from '../../../context/chats/chatContext';
import msgContext from '../../../context/messages/msgContext';
import ClearIcon from '@mui/icons-material/Clear';



const Component = styled(Box)`
    height: 60px;
    display: flex;
    padding: 9px 2px;
    margin-bottom: 1px;
    background-color: #b4b4b4;
    cursor: pointer;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px',
});

const Container = styled(Box)`
    display: flex;
`;

const SelectedText = styled(Box)`
    margin-right: 5px;
`;

const Clrear = styled(Box)`
    margin-left: 40px;
    cursor: pointer;
`;

const UsersItems = (props) => {
    const { profile,
        user,
        setOpenUserDrawer,
        isGroup,
        addUserInGrp,
        removeUserfromgrp
    } = props;


    const [selected, setSelected] = useState(false); 
    const [viewProfile, setViewProfile] = useState(false);

    const handleViewUser = () => {
        setViewProfile(true);
    };

    const chatValue = useContext(chatContext);
    const messageValue = useContext(msgContext);
    const { setChatProfile } = messageValue;
    const { createNewChat } = chatValue;

    let newChatID = "";

    const handNewChatting = async () => {
        if (!isGroup) {
            const fetchData = async () => {
                newChatID = await createNewChat(user.friendshipID);
            }
            await fetchData();
            setChatProfile({
                chatID: newChatID,
                chatName: user.name,
                profilePhoto: profile,
                isGroup: false
            });
            setOpenUserDrawer(false);
        }
        else {
            addUserInGrp(user.userID, user.name);
            setSelected(true);
        }
    }

    const removeUser = () =>{
        removeUserfromgrp(user.userID, user.name);
        setSelected(false);
    }

    return (
        <div title='Send Meesage' >
            <Component >
                <div title='View' onClick={handleViewUser}>
                    <Image src={profile} alt="display picture" />
                </div>
                <Box style={{ width: '100%' }} onClick={handNewChatting}>
                    <Container >
                        <Typography >
                            <strong>{user.name}</strong>
                        </Typography>
                    </Container>
                    {user.email}
                </Box>
                <SelectedText>
                    {selected ?
                    <>
                    <Clrear>
                    <ClearIcon onClick={removeUser}/>
                    </Clrear>
                    Selected
                    </> 
                    :
                     ""}
                </SelectedText>
                <ProfileDrawer viewProfile={viewProfile}
                    setViewProfile={setViewProfile}
                    profileDetails={user}
                    profilePhoto={profile}
                />
            </Component>

        </div>
    )
}

export default UsersItems
