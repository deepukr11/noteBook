import React from 'react';
// import { useEffect } from 'react';
import { AttachFile } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
   
    &  > * {
        margin: 5px;
        color: #919191;
        
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #c9c4c6;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)';
    cursor: pointer;
`;

const SendI = styled(SendIcon)`
    cursor: pointer;
`;



const Footer = ({sendText, setValue, value, setSend}) => {

    const onFileChange = (e) => {
        setValue(e.target.files[0].name);
        // setFile(e.target.files[0]);
    }

    const handleSend = (e)=>{
        sendText(e);
        setSend(true);
    }

  return (
  <>
    
    <Container>
    <label htmlFor="fileInput">
        <ClipIcon />
    </label>
    <input
        type='file'
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e)}
    />

    <Search>
        <InputField
            placeholder="Type a message"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => sendText(e)}
            value={value}
        />
    </Search>
    <SendI onClick={handleSend}/>
</Container>
</>

  )
}

export default Footer
