import React from 'react';
import {Box,styled, Typography, Divider  } from '@mui/material';
import image from '../../../image/logo.png'

const Component = styled(Box)`
    text-align: center;
    height: 90.5vh;
`;

const Container = styled(Box)`
    padding: 0 302px;
    
`;
    
const Image = styled('img')({
    marginTop: 60,
    marginLeft: 110,
    width: 350,
    opacity: 0.6
})
   
const Title = styled(Typography)`
    font-size: 32px;
    font-family: inherit;
    font-weight: 300;
    color: #ffffff;
    margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #ffffff;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;

const EmptyChatBox = () => {
  return (
    <Component>
    <Container>
        <Image src={image} alt="empty" />
        <Title>       
            <strong><strong>NoteBook</strong></strong>          
            </Title>
        <SubTitle>
        Welcome to Our NoteBook Chat !         
            </SubTitle>
        <SubTitle>
            Now send and receive messages with your Friend
             </SubTitle>
        
        <StyledDivider />
    </Container>
</Component>
  )
}

export default EmptyChatBox
