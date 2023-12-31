import React from 'react'
import { Link } from "react-router-dom";



const Home = () => {
    localStorage.removeItem('findBE');
    localStorage.removeItem('viewFriendProfile');
    localStorage.removeItem('friendshipToken');
    return (
        <section className="vh-100" >
            <div className='bg-img'>
                <div className="container text">
                    <div className="mt-4"><br />
                        {localStorage.getItem('token') ?
                            <div className="modal-footer mt-4">
                                <Link title="See Notes" className=" btn btn-outline-light ms-auto rounded-circle" to="/notes"><strong>Notes</strong></Link>
                                <div className="mx-3"></div>

                                <Link title="Add Note" className="btn fa-solid Buttoncolor fa-circle-plus fa-beat fa-2xl mt-1 " to="/addnote" />  {/* Add note buttone */}
                            </div>
                            :
                            <div className=' mt-4 '>
                                <form className="d-flex " >
                                    {<Link className=" btn btn-outline-light fa-beat mx-4 ms-auto" to="/login" role="button"><strong>Login</strong></Link>}
                                    {<Link className=" btn btn-outline-light fa-beat " to="/signup" role="button"><strong>Signup</strong></Link>}
                                </form>
                            </div>
                        }
                    </div>

                    <h2><strong>Welcome to Our NoteBook !</strong></h2>
                    <strong className='container'>Keep Safe Your Notes</strong>
                    <br /><br />
                    <div className="container ">
                        <h4>Features of our Notebook:</h4>
                        <div className="container">
                            <strong>User Accounts and Authentication:
                            </strong>
                            <p >Users can create accounts and log in to the notebook website to access their personalized notes.
                                User authentication ensuresdata privacy and security. </p>
                            <strong>
                                Note Creation and Organization:
                            </strong>
                            <p>Users can create new notes and organize them into notebooks or categories. The ability to create multiple notebooks allows users to keep different subjects or projects separate. </p>

                            <strong>Tags and Labels:
                            </strong><p>Users can assign tags or labels to their notes, making it easy to categorize and quickly find related information.</p>

                            <strong>Data Backup and Security:
                            </strong><br /><p>The website may offer data backup features to ensure that users' notes are protected from accidental loss. Security measures, such as encrypted connections, are implemented to safeguard user data.</p>
                        </div>
                        <div className="container"><p>
                            The Notebook Website: Empowering Digital Note-Taking and Collaboration <br />
                            The Notebook Website revolutionizes the way individuals and teams capture, organize, and collaborate on information. With its user-friendly interface, users can create personalized accounts, securely log in,
                            and embark on their digital note-taking journey. The rich text editing feature empowers users to format and structure their notes, while tags and labels facilitate effortless categorization and quick retrieval
                            of information. <br />
                            Through its powerful search functionality, users effortlessly locate desired content within notebooks, ensuring efficiency and productivity. Furthermore, the website's web clipping and bookmarking capabilities
                            facilitate research by enabling users to save valuable content from the internet directly into their notes. <br />
                            The platform thrives on seamless synchronization across devices, ensuring accessibility on desktops, laptops, tablets, and smartphones. Users can collaborate effortlessly, share notes, and provide insightful
                            comments, fostering seamless teamwork and group projects.
                           
                        </p></div>
                    </div>
                </div>
                <br />
            </div>
        </section>
    )
}

export default Home
