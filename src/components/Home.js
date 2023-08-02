import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div >  
            <div className="container my-4">

                {localStorage.getItem('token') ?
                    <div className="modal-footer">
                        <Link className=" btn btn-dark ms-auto rounded-circle" to="/notes"><strong>Get Note</strong></Link>
                        <Link className="btn fa-solid fa-circle-plus fa-beat fa-2xl mt-1 mx-2" to="/addnote" />  {/* Add note buttone */}
                    </div>
                    :
                    <div className=' mt-4 '>
                        <form className="container d-flex " >
                            {<Link className=" btn btn-dark fa-beat mx-5 ms-auto" to="/login" role="button"><strong>Login</strong></Link>}
                            {<Link className=" btn btn-dark fa-beat " to="/signup" role="button"><strong>Signup</strong></Link>}
                        </form>
                    </div>
                }

                <h1><strong>Welcome to our NoteBook !</strong></h1>
                <strong> we are passionate about providing you with the
                    perfect tools to unlock your creativity and boost your productivity. Our carefully curated selection
                    of notebooks offers something for everyone, from artists and writers to students and professionals.
                    Each notebook is thoughtfully designed with both form and function in mind. With durable, high-quality materials and exquisite craftsmanship, our notebooks are not only beautiful but also built to withstand the test of time.
                    Whether you prefer a classic leather-bound journal, a sleek and modern design, or a vibrant and colorful cover, we have a wide range of options to suit your style and preferences.
                    Inside, you'll find smooth, acid-free paper that's a joy to write on, allowing your ideas to flow freely without smudging or bleeding through. Our notebooks come in various sizes, so you can choose the perfect fit for your on-the-go lifestyle or your desk.
                    Organize your thoughts, sketch your wildest dreams, or jot down important notes in our versatile notebooks that adapt to your needs.
                    Join our growing community of creative individuals and share your notebook journey with us on social media using #NotebookJourney. We can't wait to see where your inspiration takes you with our notebooks by your side.
                    Discover the perfect notebook that complements your unique style and aspirations today. Dive into the world of creativity and productivity with NoteBook. Happy writing!</strong></div>

        </div>
    )
}

export default Home
