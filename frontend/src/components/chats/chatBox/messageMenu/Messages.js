import { useEffect, useContext, useState } from 'react';
import { Box, styled } from '@mui/material';
import Footer from './Footer';
import MessageItems from './MessageItems';
import msgContext from '../../../../context/messages/msgContext';



const Wrapper = styled(Box)`
    // background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
    
`;

// const StyledFooter = styled(Box)`
//     height: 55px;
//     background: #ededed;
//     // position: absolute;
//     width: 100%;
//     // bottom: 0
// `;

const Component = styled(Box)`
    height: 77vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 2px ;
    margin-bottom: 10px;
`;


const Messages = ({ chatID }) => {

    
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [send, setSend] = useState(false);

    const messageValue = useContext(msgContext);
    const { getMessages, sendMessage, setNewmessage} = messageValue;
    
    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if(!value) return;

        if(code === 13 || send) {
            sendMessage(chatID, value);
            // setNewmessage(value);
            setNewMessageFlag(true);
            setSend(false); 
            setValue('');
        } 
    }

    useEffect(() => {
        const fetchData = async () => {
            let messagesData = await getMessages(chatID);
            setMessages(messagesData);
        }
        fetchData();
        setNewMessageFlag(false);
        // eslint-disable-next-line
    }, [chatID, newMessageFlag]);
 
    return (
        <Wrapper>
            <Component>
                <Container >
                    { 
                        messages && messages.map(message => {
                            return <MessageItems 
                            key={message._id} 
                            message={message}
                            setNewMessageFlag={setNewMessageFlag} />
                        })
                    }
                </Container>
            </Component>
            <Footer
            sendText={sendText} 
            value={value} 
            setValue={setValue} 
            setSend={setSend}
            />
        </Wrapper>
    )
}

export default Messages
