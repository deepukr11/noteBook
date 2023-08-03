import './App.css';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNotes from './components/AddNotes';
import Notes from './components/Notes';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {

  const [progress, setProgress] = useState(0);

  return (
    <>


      <NoteState>
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

          </Switch>

        </Router>
      </NoteState>

    </>
  );
}

export default App;
