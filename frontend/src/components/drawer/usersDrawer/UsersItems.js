import { useState, useContext } from 'react';
import { styled, Box, Typography } from "@mui/material";
import ProfileDrawer from '../ProfileDrawer';
import chatContext from '../../../context/chats/chatContext';
import msgContext from '../../../context/messages/msgContext';


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


const UsersItems = ({ profile, user, setOpenUserDrawer, isGroup }) => {

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
