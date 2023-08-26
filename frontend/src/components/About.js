import React from 'react'


export default function About(props) {
  localStorage.removeItem('findBE');
  localStorage.removeItem('viewFriendProfile');
  localStorage.removeItem('friendshipToken');
  return (
    <section className="vh-100" >
      <div className='mt-5 container text bg-img'><br />
        <div className="container ">
          <h1><strong>About Our NoteBook !</strong></h1>
          <strong className='container'>Keep Safe Your Notes</strong>
          <br /><br />
          <div className="container ">
            <h3>Our NoteBook: Empowering Your Digital Note Journey</h3>
            <div className="container">
              <p >Welcome to "Our Note Book," where we believe in transforming the way you take notes. Our platform is a revolutionary
                digital notebook designed to elevate your note-taking experience to new heights. With a user-friendly interface, getting
                started is a breeze, allowing you to focus on capturing and organizing your ideas effortlessly. </p>

              <p>Discover a world of organization and personalization as you create notebooks and sections to structure your notes just the
                way you like. The rich text formatting, images, and tags feature empowers you to add personality and context to your notes,
                making them uniquely yours.</p>

              <p>Gone are the days of endless copy-pasting from the web. With our cutting-edge web clipping and bookmarking capability, save
                valuable content directly into your notes with just a click. Never lose crucial information again with our robust and powerful
                search function, ensuring quick access to your notes when you need them the most.</p>

              <p>Stay in sync with your notes across all devices – desktop, tablet, and mobile. Our multi-device synchronization feature ensures
                you're always connected to your ideas, no matter where you are.</p>

              <p>Collaboration has never been simpler. Share your notes with colleagues, friends, or family, inviting them to collaborate seamlessly.
                Feedback and teamwork have never been more efficient.</p>

              <p>We prioritize your security and privacy. Rest assured that your notes are protected with state-of-the-art security measures. And with
                reminders and notifications, never miss an important deadline or task again.</p>

              <p>Personalize your notebook further with themes and layout options, making your note-taking experience truly yours.</p>

              <p><strong>Join "Our NoteBook" today and embark on a delightful journey of note-taking and collaboration. Unleash the full potential of your ideas,
                creativity, and productivity. Together, let's redefine the art of note-taking!</strong></p>
            </div>
          </div>
        </div>
        <br />
      </div>
    </section>
  )
}
