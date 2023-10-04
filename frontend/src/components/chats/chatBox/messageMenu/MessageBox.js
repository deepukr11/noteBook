import { useContext, useState} from 'react';
import { Box , styled} from '@mui/material';
import MsgHeader from './MsgHeader';
import Messages from './Messages';
import msgContext from '../../../../context/messages/msgContext';
import UserProfileDrawer from '../../../drawer/UserProfileDrawer';


const Component = styled(Box)`
    overflow: overlay;
    height: '75%';
    width: 141vh;
    
`;

const MessageBox = () => {

  const messageValue = useContext(msgContext);
  const {chatProfile} = messageValue;

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
      setOpenDrawer(true);
  }

  return (
    <Component style={{}}    >
            <div onClick={toggleDrawer}>
            <MsgHeader 
               chatProfile={chatProfile}                     
                />  
                </div>                     
            <Messages chatID ={chatProfile.chatID} />
            <UserProfileDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} chatProfile={chatProfile}/>
           
        </Component>
  )
}

export default MessageBox
