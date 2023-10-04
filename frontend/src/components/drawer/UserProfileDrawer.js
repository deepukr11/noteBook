import { useContext } from 'react';
import { styled, Drawer, Box, Typography } from '@mui/material';
import msgContext from '../../context/messages/msgContext';
import UsersItems from './UsersItems';
import { decrypt } from 'n-krypta';

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img')({
    width: 200,
    height: 200,
    borderRadius: '50%',
    padding: '25px 0'
});

const BoxWrapper = styled(Box)`
    background: #FFFFFF;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const DescriptionContainer = styled(Box)`
    padding: 10px 20px 2px 30px;
    & > p {
        color: #8696a0;
        font-size: 13px;
    }
`;

const Header = styled(Box)`
  background: #005569;
  height: 80px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const Component = styled(Box)`
  background: #4d4c63;
  height: 85%;
`;

const Text = styled(Typography)`
    font-size: 18px;
`;

const drawerStyle = {
    left: 1050,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}

const GroupCreater = styled(Typography)`
padding: 20px 0px 0px 10px;
`;

const UserComponent = styled(Box)`
    overflow: overlay;
    height: 77vh;
    background-color: #4d4c63;
    margin-top: 3px;
`;


const UserProfileDrawer = (props) => {

    const messageValue = useContext(msgContext);
    const { chatDetails } = messageValue;
    const { openDrawer, setOpenDrawer, chatProfile } = props;
    let groupAdminIDSize = "";
    let grpCreater = "";
    if(chatProfile.isGroup){
        groupAdminIDSize = chatDetails.groupAdminID.length;
        const participantSize = chatDetails.usersID.length;
    
        for(let i=0; i<participantSize; i++){
            if(chatDetails.groupCreaterID === chatDetails.usersID[i]){
                grpCreater = decrypt(chatDetails.usersName[i], chatDetails.usersID[i]);
            }
        }
    }

    const anchor = 'right';


    return (
        <Drawer
            open={openDrawer}
            anchor={anchor}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <Text>
                    <i className="fa-sharp fa-solid fa-arrow-left fa-xl ms-2 me-5" onClick={() => setOpenDrawer(false)} />
                    <strong>Account Information</strong>
                </Text>
            </Header>
            <Component>
                <ImageContainer>
                    <Image src={chatProfile.profilePhoto} alt="Profile" />
                </ImageContainer>
                <BoxWrapper>
                    <h3>
                        <strong>{chatProfile.chatName}</strong>
                    </h3>
                    <DescriptionContainer>
                        <Typography>
                            Welcome to Our NoteBook !
                            Keep Safe Your Notes
                            Features of our Notebook:
                            User Accounts and Authentication:
                            Users can create accounts and log in to the notebook website to access their personalized notes. User authentication ensuresdata privacy and security.
                        </Typography>
                        {chatProfile.isGroup?
                        <>
                        <GroupCreater>
                            Created By: 
                        <strong>  {grpCreater}</strong>
                        </GroupCreater>
                        </>
                        :
                        ""

                        }
                    </DescriptionContainer>
                </BoxWrapper>
                {chatProfile.isGroup ?
                    <UserComponent>
                        {
                            chatDetails.usersID.map((userID, index) => {
                                return <UsersItems key={userID}
                                    index={index}
                                    chatDetails={chatDetails}
                                    groupAdminIDSize={groupAdminIDSize}
                                    photo={chatProfile.profilePhoto} />

                            })}
                    </UserComponent>
                    :
                    <BoxWrapper>
                        <Typography>About</Typography>
                        <Typography>Eat! Sleep! Code! Repeat</Typography>
                    </BoxWrapper>}
            </Component>
        </Drawer>
    )
}

export default UserProfileDrawer
