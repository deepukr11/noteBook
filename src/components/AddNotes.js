import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useHistory } from 'react-router-dom';


const AddNotes = (props) => {

    let history = useHistory();
    const contextValue = useContext(noteContext);
    const { addNote } = contextValue; // import addNote function through context

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmit = (e) => {
        e.preventDefault();           // page will not  be reloded by using this fuction
        addNote(note.title, note.description, note.tag);  // addNote function here
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully", "success" );
        history.push("/notes");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handlCancel = ()=>{
        history.push("/notes");
    }

    return (
        <>


         <div className='container  '><br />
             <h3 className='container mt-5'><strong>Add Note</strong></h3>
             <form onSubmit={handleSubmit}>
                 <div className="mb-3 mt-4">
                     <label htmlFor="title" className="form-label">Title</label>
                     <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" minLength={3} required onChange={onChange} />
                 </div>
                 <div className="mb-3">
                     <label htmlFor="description" className="form-label">Description</label>
                     <input type="text" className="form-control" id="description" value={note.description} name="description" minLength={5} required onChange={onChange} />
                 </div>
                 <div className="mb-3">
                     <label htmlFor="tag" className="form-label">Tag</label>
                     <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} />
                 </div>
                 <div className="modal-footer">               
                     <button type="submit" className="btn btn-dark" ><strong>Add Note</strong></button>
                 </div>
             </form>
             <button type="button"  className="btn btn-dark" onClick={handlCancel}><strong>Cancel</strong></button>


         </div>

        </>
    )
}

export default AddNotes
