// import React, { useContext } from 'react'
// import { Link } from "react-router-dom";
// import userContext from '../context/users/userContext';

// const UserFriend = () => {

//     const contextValue = useContext(userContext);
//     const { findUser } = contextValue;

//     return (
//         <div className='login-bg-img'>
//             <section className="vh-100" >
//                 <div className="container py-5 h-100">
//                     <div className="row d-flex justify-content-center align-items-center mt-2">
//                         <div className="modal-footer my-4">
//                             <Link title="See Your Notes" className=" btn btn-outline-light ms-auto rounded-circle" to="/notes"><strong>Your Notes</strong></Link>
//                         </div>
//                         <div className="col col-md-9 col-lg-7 col-xl-5">

//                             <div className="card" >

//                                 <p className='mb-3 ms-auto mt-1 me-1'><strong>User ID: </strong>{findUser.id}</p>
//                                 <div className="ms-2">
//                                     <h5 >
//                                         <strong>{findUser.name}</strong>
//                                     </h5>
//                                     <p className="mt-2 mb-5" ><strong>{findUser.email}</strong></p>
//                                 </div>

//                                 <p className="small text-muted mb-0 ms-1">Registered Date and Time:</p>
//                             </div>

//                             {/* <p className="mb-0 date-color">{new Date(User.date).toGMTString()}</p> */}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default UserFriend



