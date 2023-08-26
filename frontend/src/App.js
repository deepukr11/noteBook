import './App.css';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import UserState from './context/users/UserState';
import RequestState from './context/requests/RequestState';
import FriendState from './context/friends/FriendState';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import AddNotes from './components/notes/AddNotes';
import Notes from './components/notes/Notes';
import Profile from './components/profile/Profile';
import FindUserByEmail from './components/findFriend/FindUserByEmail';
import FindUserById from './components/findFriend/FindUserById';
import ViewUser from './components/findFriend/ViewUser';
import ReceivedRequests from './components/requests/ReceivedRequests';
import SentRequests from './components/requests/Sent';




import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Friends from './components/friends/Friends';
import ViewFriendDetailes from './components/friends/ViewFriendDetailes';







function App() {

  const [progress, setProgress] = useState(0);

  return (
    <>


      <NoteState>
        <UserState>
          <RequestState>
            <FriendState>
              <Router>
                <LoadingBar
                  color='#f11946'
                  progress={progress}
                />
                <Navbar setProgress={setProgress} />
                <Switch>
                  <Route exact path="/"><Home /></Route>

                  <Route exact path="/notes"><Notes setProgress={setProgress} /></Route>

                  <Route exact path="/addnote"><AddNotes setProgress={setProgress} /></Route>

                  <Route exact path="/about"><About /></Route>

                  <Route exact path="/login"><Login setProgress={setProgress} /></Route>

                  <Route exact path="/signup"><Signup setProgress={setProgress} /></Route>

                  <Route exact path="/profile"><Profile /></Route>

                  <Route exact path="/findFriendByEmail"><FindUserByEmail setProgress={setProgress} /></Route>

                  <Route exact path="/findFriendById"><FindUserById setProgress={setProgress} /></Route>

                  <Route exact path="/viewUser"><ViewUser setProgress={setProgress} /></Route>

                  <Route exact path="/receivedRequests"><ReceivedRequests setProgress={setProgress} /></Route>

                  <Route exact path="/sentRequests"><SentRequests setProgress={setProgress} /></Route>
                  
                  <Route exact path="/friends"><Friends setProgress={setProgress} /></Route>

                  <Route exact path="/friendDetails"><ViewFriendDetailes setProgress={setProgress} /></Route>



                </Switch>

              </Router>
            </FriendState>
          </RequestState>
        </UserState>
      </NoteState>

    </>
  );
}

export default App;
