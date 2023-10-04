import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Box, styled, Typography, InputBase } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { decrypt } from 'n-krypta';
import { formatDate } from '../../../common-time';
import msgContext from '../../../../context/messages/msgContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';

const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Container = styled(Box)`
    padding: 1px 70px;
`;

const Own = styled(Box)`
    background: #dbade3;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const ClipIcon = styled(ExpandMoreIcon)`
    opacity: 0.2;
    cursor: pointer;
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '85%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#dbd6dc',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

const SendI = styled(SendIcon)`
    cursor: pointer;
`;


const MessageItems = ({ message, setNewMessageFlag }) => {

  const messageValue = useContext(msgContext);

  const {editMessage, deleteMessage } = messageValue;
  
  const scrollRef = useRef();
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
  }, [message]);
  
  const textMessage = decrypt(message.text, message.senderID);
  
  const [openDrawer, setOpenDrawer] = useState(null);
  const open = Boolean(openDrawer);

  const handleClick = (e) => {
    setOpenDrawer(e.currentTarget);
  };
  const handleClose = () => {
    setOpenDrawer(null);
  };

  const [openEditer, setOpenEditer] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleCloseEditer = () => setOpenEditer(false);


  const handleEditer = (e) => {
    handleClose();
    setNewMessage(textMessage);
    setOpenEditer(true);
  }

  const sendEditedMessage = () => {
    if (!newMessage) {
      setNewMessageFlag(true);
      setNewMessage("");
      return;
    }   
    editMessage(message._id, newMessage);
    setNewMessageFlag(true);
    setNewMessage("");
    handleCloseEditer();
  };

  const handleDeleteMessage = () => {
    handleClose();
    deleteMessage(message._id);
    setNewMessageFlag(true);
  }


  return (
    <Container ref={scrollRef}>
      {  
        
        localStorage.getItem('Id') === message.senderID ?
          <Own>
            {/* <TextMessage message={message} /> */}
            <Text>{textMessage} </Text>
            <Time>{formatDate(message.createdAt)}</Time>
            <ClipIcon
              id="demo-positioned-button"
              aria-controls={open ? 'drawer-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          </Own>
          :
          <Wrapper>
            {/* <TextMessage message={message} /> */}
            <Text>{textMessage} </Text>
            <Time>{formatDate(message.createdAt)}</Time>
          </Wrapper>
      }

      <Menu
        id="drawer-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={openDrawer}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          id="demo-positioned-button"
          aria-controls={open ? 'drawer-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleEditer}
        ><strong>Edit</strong> </MenuItem>

        <MenuItem onClick={handleDeleteMessage}><strong>Unsend</strong></MenuItem>
      </Menu>

      <Modal
        open={openEditer}
        onClose={handleCloseEditer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Own sx={style}>
        <InputField
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
        />
          <SendI onClick={sendEditedMessage}/>
        </Own>
      </Modal>

    </Container>

  )
}

export default MessageItems
