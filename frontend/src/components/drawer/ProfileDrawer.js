import React, { useState, useContext } from 'react';
import { styled, Drawer, Box, Typography } from '@mui/material';
import friendContext from '../../context/friends/friendContext'


const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img')({
    width: 250,
    height: 250,
    borderRadius: '50%',
    padding: '25px'

});

const BoxWrapper = styled(Box)`
    background: #FFFFFF;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        color: #8696a0;
        font-size: 13px;
    }
`;

const Header = styled(Box)`
  background: #005569;
  height: 107px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const Component = styled(Box)`
    overflow: overlay;
    height: 77vh;
    background-color: #4d4c63;
    margin-top: 2px;
`;


const Text = styled(Typography)`
    font-size: 18px;
`;

const Time = styled(Typography)`
font-size: 10px;
margin-left: 150px;
`;

const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}

const UnfriendItems = styled(Box)`
display: flex;

`;

const CencelItem = styled(Box)`
    margin-right: auto;
    margin-left: 20px;
   
`;

const UnfriendItem = styled(Box)`
    margin-left: auto;
   
`;



const ProfileDrawer = (props) => {

    const { viewProfile, setViewProfile, profileDetails, profilePhoto} = props;
    const { name, email, userID, date, relation } = profileDetails;

    // for friend 
    const friendContextValu = useContext(friendContext);
    const { Unfriend } = friendContextValu;

    const [friend, setFriend] = useState(true);

    const handleUnfriend = () => {
        Unfriend(userID);
    }

    const anchor = 'left';
    return (
        <Drawer
            open={viewProfile}
            anchor={anchor}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <Text>
                    <i className="fa-sharp fa-solid fa-arrow-left fa-xl ms-2 me-5" onClick={() => setViewProfile(false)} />
                    <strong>{relation === "friend" ?
                                "Friend "
                                :
                                "My "
                                }
                        Profile
    
                    </strong>
                </Text>
            </Header>
            {friend ?
                <Component>
                    <ImageContainer>
                        <Image src={profilePhoto} alt="Profile" />
                    </ImageContainer>
                    <div className='ms-5 mb-3 Buttoncolor'>User Id: <strong>{userID}</strong></div>
                    <BoxWrapper>
                        <Time><strong>
                            {relation === "friend" ?
                                "Friendship Date:"
                                :
                                "Registered Date:"
                                }

                        </strong> {new Date(date).toGMTString()}</Time>
                        <h3>
                            <strong>{name}</strong>
                        </h3>
                        <Typography><strong>{email}</strong></Typography>
                    </BoxWrapper>
                    <BoxWrapper>
                        <DescriptionContainer>
                            <Typography><strong>About</strong></Typography>
                            <Typography>If there is no one to hold your hand , Put your hand in your pocket and continue your journey.</Typography>
                        </DescriptionContainer>
                    </BoxWrapper>
                    <BoxWrapper>
                        <Typography>
                            Software is like sex: it’s better when it’s free. – Linus Torvalds
                        </Typography>
                    </BoxWrapper>

                    <BoxWrapper>
                        {relation === 'friend' ?
                            <div className="modal-footer">
                                <button onClick={() => setFriend(false)}
                                    className="btn btn-outline-danger ms-auto rounded-circle mt-1"
                                    title='Unfriend'
                                    type="submit">
                                    <strong>Unfriend</strong>
                                </button>
                            </div>
                            :
                            ""}
                    </BoxWrapper>
                </Component>
                : 
                <>
                    <BoxWrapper>
                        <Time><strong>
                            {relation === "friend" ?
                                "Friendship Date:"
                                :
                                ""}
                        </strong> {new Date(date).toGMTString()}</Time>
                        <h4><strong>Are You Sure</strong></h4>
                        <Typography>
                            <strong>
                                <strong>
                                    You want to Unfriend to this User !
                                </strong>
                            </strong>
                        </Typography>
                    </BoxWrapper>
                    <UnfriendItems>
                        <CencelItem>
                            <button onClick={() => setFriend(true)}
                                title="Cancel"
                                className="btn btn-dark ms-auto fa-beat rounded-circle mt-2">
                                Cancel
                            </button>
                        </CencelItem>
                        <UnfriendItem>
                            <button onClick={handleUnfriend}
                                className="btn btn-outline-danger ms-auto rounded-circle me-3 mt-2"
                                title='Unfriend'
                                type="submit">
                                Unfriend
                            </button>
                        </UnfriendItem>
                    </UnfriendItems>
                </>}
        </Drawer>
    )
}

export default ProfileDrawer
