import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FriendState from './context/friends/FriendState';
import NoteState from './context/notes/NoteState';
import UserState from './context/users/UserState';
import RequestState from './context/requests/RequestState';
import ChatState from './context/chats/ChatState';
import MsgState from './context/messages/MsgState';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FriendState>
      <NoteState>
        <UserState>
          <RequestState>
            <ChatState>
              <MsgState>

              <App />
              
              </MsgState>
            </ChatState>
          </RequestState>
        </UserState>
      </NoteState>
    </FriendState>
    
  </React.StrictMode>
);

