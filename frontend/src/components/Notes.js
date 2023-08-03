import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import { useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from './Alert';


const Notes = (props) => {

  const [alert, setAlert] = useState(null);

  const showAlert = (messege, type) => {
    setAlert({
      msg: messege,
      tp: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  const contextValue = useContext(noteContext);
  let history = useHistory();
 
  const { notes, getNotes, editNote } = contextValue;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    props.setProgress(0)
    ref.current.click()
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleUpdate = async (e) => {
    props.setProgress(50);
    await editNote(note.id, note.etitle, note.edescription, note.etag);
    props.setProgress(70);
    refClose.current.click();
    props.setProgress(80)
    showAlert("Updated Successfully", "success");
    props.setProgress(100)
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='login-bg-img Buttoncolor container'>
      <div className="container">
        <br />
        <div className="modal-footer mt-5">        {/* Add note buttone */}

        <div className="container d-flex justify-content-center"><Alert alert={alert} /> </div> {/*Alert show here */}

          <Link className=" btn fa-solid Buttoncolor fa-circle-plus fa-beat fa-2xl mt-4  ms-auto" to="/addnote" />
        </div>

        <i ref={ref} className="fa-solid fa-plus fa-2xl mt-4 me-5 ms-auto d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        <div className="modal fade texte-dit-color" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3 mt-4">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleUpdate} className="btn btn-dark">Update Note</button>
              </div>
            </div>
          </div>
        </div>




        <h2 className='container'><strong>Your Notes</strong></h2>
        <div className='row my-2'>
          <div className="container mx-4">
            {notes.length === 0 && `No Note to Display`}
          </div>
          {notes.map((note) => {
            return <NoteItems key={note._id} setProgress={props.setProgress} updateNote={updateNote} note={note} showAlert={showAlert} />
          })}

        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Notes
