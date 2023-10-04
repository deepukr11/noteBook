import { useState, useEffect, useContext } from 'react';
import chatContext from '../../../context/chats/chatContext';
import { Box, styled } from '@mui/material';
import ChatItems from './ChatItems';
import { useHistory } from 'react-router-dom';


const Component = styled(Box)`
    overflow: overlay;
    height: 77vh;
    background-color: #4d4c63;
    margin-top: 2px;
`;


const Chat = () => {

    let history = useHistory();

    const chatValue = useContext(chatContext);
    const { getChats } = chatValue;

    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push("/");
        }
        else {
            localStorage.removeItem('findBE');
            localStorage.removeItem('viewFriendProfile');
            localStorage.removeItem('friendshipToken');
            const fetchData = async () => {
                let data = await getChats();
                setUsers(data);
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, []);


    return (
        <Component>
            {
                users.map((user) => {             
                 return    <ChatItems 
                            key={user._id} 
                            user={user} 
                            />
                        })}
        </Component>
    )
}

export default Chat;