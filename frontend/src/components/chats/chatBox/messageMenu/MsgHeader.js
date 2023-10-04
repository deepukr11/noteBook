import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

const Header = styled(Box)`
    height: 44px;
    background: #6bd2e9;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    cursor: pointer;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 40px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;


const MsgHeader = (props) => {
    const {chatProfile} = props;
  return (
    <Header >
            <Image src={chatProfile.profilePhoto} alt="display picture" />     
            <Box>
                <Name><strong>{chatProfile.chatName}</strong></Name>
                <Status>online</Status>
            </Box>   
            <RightContainer>
                <Search />
                <MoreVert />    
            </RightContainer> 
            
        </Header>
  )
}

export default MsgHeader
