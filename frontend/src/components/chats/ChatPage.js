import React from 'react'
import { useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import MyChats from './chatMenu/MyChats';
import EmptyChatBox from './chatBox/EmptyChatBox';
import MessageBox from './chatBox/messageMenu/MessageBox';
import msgContext from '../../context/messages/msgContext';



const ChatPage = () => {

    let history = useHistory();

    if (localStorage.getItem('token')) {
        localStorage.removeItem('findBE');
        localStorage.removeItem('viewFriendProfile');
        localStorage.removeItem('friendshipToken');
    }
    else {
        history.push("/");
    }

    const messageValue = useContext(msgContext);
    const { chatProfile } = messageValue;

    const Component = styled(Box)`
    display: flex;
`;

    const LeftComponent = styled(Box)`
    min-width: 450px;
`;

    const RightComponent = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

    return (
        <>
            <div className='mt-2 mx-3'
            > <br /><br />
                <Component>
                    <LeftComponent>
                        <MyChats />
                    </LeftComponent>
                    <RightComponent>
                        {chatProfile.chatID.length === 0 ?
                            <EmptyChatBox />
                            :
                            <MessageBox />
                        }
                    </RightComponent>
                </Component>
            </div>
        </>
    )
}

export default ChatPage
