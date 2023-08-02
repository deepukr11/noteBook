import './App.css';
import { useState } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNotes from './components/AddNotes';
import Notes from './components/Notes';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  
const [alert , setAlert]=  useState(null);

const showAlert = ( messege, type)=>{
     setAlert({
      msg: messege,
      tp : type 
     })
    setTimeout(()=>{
       setAlert(null);
    },2000)
}

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}  />
          <div className="container">
            <Switch>
              <Route exact path="/"><Home showAlert={showAlert}/></Route>

              <Route exact path="/notes"><Notes showAlert={showAlert}/></Route>
              
              <Route exact path="/addnote"><AddNotes showAlert={showAlert}/></Route>

              <Route exact path="/about"><About /></Route>

              <Route exact path="/login"><Login showAlert={showAlert}/></Route>

              <Route exact path="/signup"><Signup showAlert={showAlert}/></Route>
            </Switch>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
