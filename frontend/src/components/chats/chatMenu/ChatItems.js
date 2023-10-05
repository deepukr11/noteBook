import { useContext } from 'react';
import { styled, Box, Typography, Divider } from "@mui/material";
import profile from '../../../image/profile.jpg';
import { decrypt } from 'n-krypta';
import msgContext from '../../../context/messages/msgContext';


const Component = styled(Box)`
    height: 60px;
    display: flex;
    padding: 9px 2px;
    cursor: pointer;
    margin-bottom: 1px;
    background-color: #b4b4b4;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});

const Container = styled(Box)`
    display: flex;
`;

// const Timestamp = styled(Typography)`
//     font-size: 12px;
//     margin-left: auto;
//     color: #00000099;
//     margin-right: 20px;
// `;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
`;

const Date = styled(Typography)`
display: block;
color: rgba(0, 0, 0, 0.6);
font-size: 10px;
margin-left: auto;
`;


const ChatItems = ({ user}) => {

    const messageValue = useContext(msgContext);
    const { setChatProfile, setChatDetails} = messageValue;

    let name = "";
    let newmessage="hello";
    const Id = localStorage.getItem('Id');
    if (user.isGroupChat) {
        if (Id === user.usersID[0]) {
            name = decrypt(user.groupName, user.usersID[0]);
        }
    }
    else {
        if (Id === user.usersID[0]) {
            name = decrypt(user.usersName[1], user.usersID[1]);
        }
        else {
            name = decrypt(user.usersName[0], user.usersID[0]);
        }
    }

    const getUser = (e) => {
        e.preventDefault(); 
        setChatProfile({ chatID: user._id, chatName: name, profilePhoto: profile, isGroup: user.isGroupChat});
        if (user.isGroupChat) {
            setChatDetails(user);
        } else {
            setChatDetails("");
        } 
    }
   


    return (
        <>
            <Component onClick={getUser}>
                <Box>
                    <Image src={profile} alt="display picture" />
                </Box>
                <Box style={{ width: '100%' }}>
                    <Container>
                        
                        <Typography><strong>{name}</strong></Typography>

                        <Date>monday</Date>
                        {/* { 
                        // message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    } */}
                    </Container>
                    <Box>
                        <Text>
                            {newmessage}
                            {/* {message?.text?.includes('localhost') ? 'media' : message.text} */}
                        </Text>
                    </Box>
                </Box>
                <StyledDivider />
            </Component>
        </>
    )
}

export default ChatItems
