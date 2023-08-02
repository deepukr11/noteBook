import React from 'react'


export default function About(props) {
  return (
    <div className='my-5' style={{backgroundColor: props.mode===`dark`?`gray`:`white` }}><br/>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item"  style={{backgroundColor: props.mode===`dark`?`gray`:`white` }} >
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" style={{backgroundColor: props.mode===`dark`?`#5e7666`:`white` ,color: props.mode===`dark`?`white`:`black`}} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>A</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show"  data-bs-parent="#accordionExample">
      <div className="accordion-body">
      We believe that words have the power to inspire, 
      educate, and connect people from all walks of life. We are passionate 
      about the written word and the endless possibilities it brings to the digital world.      </div>
    </div>
  </div>
  <div className="accordion-item" style={{backgroundColor: props.mode===`dark`?`gray`:`white`}}>
    <h2 className="accordion-header">
      <button className="accordion-button collapsed"  style={{backgroundColor: props.mode===`dark`?`#5e7666`:`white`,color: props.mode===`dark`?`white`:`black`}} type="button"  data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <strong>B</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse"  data-bs-parent="#accordionExample">
      <div className="accordion-body">
      What sets us apart is our commitment to quality. Every piece of content that graces our web page
       undergoes a meticulous review process. Our team ensures that each sentence is carefully crafted, 
       every idea is well-researched, and the final product meets the highest standards of excellence      </div>
    </div>
  </div>
  <div className="accordion-item" style={{backgroundColor: props.mode===`dark`?`gray`:`white`}}>
    <h2 className="accordion-header">
      <button className="accordion-button collapsed"  style={{backgroundColor: props.mode===`dark`?`#5e7666`:`white` ,color: props.mode===`dark`?`white`:`black`}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <strong>C</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse"  data-bs-parent="#accordionExample">
      <div className="accordion-body">
      We strive to deliver informative and captivating texts that cater to a wide range of interests and
       topics. Whether you're seeking articles, blog posts, or thought-provoking essays, we have you covered.      </div>
    </div>
  </div>
</div>




    </div>
  )
}
