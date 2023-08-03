import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useHistory } from 'react-router-dom';
import Swal from  'sweetalert2';

const AddNotes = (props) => {

    let history = useHistory();
    const contextValue = useContext(noteContext);
    const { addNote } = contextValue; // import addNote function through context

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmit =  (e) => {
        props.setProgress(0);
        // e.preventDefault();           // page will not  be reloded by using this fuction
        props.setProgress(65);
        addNote(note.title, note.description, note.tag);  // addNote function here
        props.setProgress(70);
        setNote({ title: "", description: "", tag: "" });
        props.setProgress(90);
        // showAlert("Added Successfully", "success" );
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Added Successfully',
            showConfirmButton: false,
            timer: 1000
          })  
          props.setProgress(100);
        history.push("/notes");

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handlCancel = ()=>{
        props.setProgress(30);
        history.push("/notes");
        props.setProgress(100);
       
    }

    return (
        <>
        {!localStorage.getItem('token') ?
        history.push("/")
        :
         <div className='login-bg-img  Buttoncolor container mt-4 '><br />
             <h3 className='container text mt-5'><strong>Add Note</strong></h3>
             
            {/* <div className="container d-flex justify-content-center"><Alert alert={alert} /> </div> Alert show here */}

             <div className="container text">
             <form onSubmit={handleSubmit}>
                 <div className="mb-3 mt-4">
                     <label htmlFor="title" className="form-label"><strong>Title:</strong></label>
                     <input type="text" className="form-control addnotewidth" id="title" name="title" value={note.title} aria-describedby="emailHelp" minLength={3} required onChange={onChange} />
                 </div>
                 <div className="mb-3">
                     <label htmlFor="description" className="form-label"><strong>Description:</strong></label>
                     <input type="text" className="form-control addnotewidth" id="description" value={note.description} name="description" minLength={5} required onChange={onChange} />
                 </div>
                 <div className="mb-3">
                     <label htmlFor="tag" className="form-label"><strong>Tag:</strong></label>
                     <input type="text" className="form-control width" value={note.tag} id="tag" name="tag" onChange={onChange} />
                 </div>
                 <div className="modal-footer">               
                     <button type="submit" className="btn btn-outline-light" ><strong>Add Note</strong></button>
                 </div>
             </form>
             <button type="button"  className="btn btn-outline-light mb-4" onClick={handlCancel}><strong>Cancel</strong></button>
             </div>
             <br /><br /><br /><br /><br /><br /><br /><br /><br />

         </div>
}

        </>
    )
}

export default AddNotes
