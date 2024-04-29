import React from 'react'
import './about.scss'

const About = () => {
  return (
    <div className="about-container">
     <div className="left-container">
          <div className="title-container">
            <div className='about-title'>ABOUT<br/>ME</div>
            <div className="text-container">
              <p className='text-uppercase'>Welcome to my creative corner! I'm a freelance artist passionate about bringing imagination to life through art.</p>
              <p className='text-lowercase'>With a love for colors, textures, and storytelling, I specialize in [mention your specialties, e.g., acrylic paintings, digital illustrations, etc.]. Join me on this artistic journey as we explore the beauty of expression together.</p>
            </div>
          </div>
        
        <div className="bottom-container">
          <h2>MY SERVICES</h2>
          <div className="services-container">
            <div className="service-container sketching">
              <p className='service-number'>01</p>
              <img src="\painting-icon-black.png" alt="painting-icon" />
              <p className='service-title'>Sketch & Painting</p>
            </div>
            <div className="service-container digital">
              <p className='service-number'>02</p>
              <img src="\digital-icon-black.png" alt="painting-icon" />
              <p className='service-title'>Digital Art</p>
            </div>
            <div className="service-container photography">
              <p className='service-number'>03</p>
              <img src="\camera-icon-black.png" alt="painting-icon" />
              <p className='service-title'>Photography</p>
            </div>
            <div className="service-container sculpture">
              <p className='service-number'>04</p>
              <img src="\sculpture-icon-black.png" alt="painting-icon" />
              <p className='service-title'>Sculpture</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default About