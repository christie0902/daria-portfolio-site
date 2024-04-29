import React from "react";
import "./about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="left-container">
        <div className="title-container">
          <div className="about-title">
            ABOUT
            <br />
            ME
          </div>
          <div className="text-container">
            <p className="text-uppercase">
              Welcome to my creative corner! I'm a freelance artist passionate
              about bringing imagination to life through art.
            </p>
            <p className="text-lowercase">
              With a love for colors, textures, and storytelling, I specialize
              in [mention your specialties, e.g., acrylic paintings, digital
              illustrations, etc.]. Join me on this artistic journey as we
              explore the beauty of expression together.
            </p>
          </div>
        </div>

        <div className="bottom-container">
          <h2>MY SERVICES</h2>
          <div className="services-container">
            <div className="service-container">
              <p className="service-number">01</p>
              <img src="\painting-icon-black.png" alt="painting-icon" />
              <p className="service-title">Sketch & Painting</p>
            </div>
            <div className="service-container">
              <p className="service-number">02</p>
              <img src="\digital-icon-black.png" alt="painting-icon" />
              <p className="service-title">Digital Art</p>
            </div>
            <div className="service-container">
              <p className="service-number">03</p>
              <img src="\camera-icon-black.png" alt="painting-icon" />
              <p className="service-title">Photography</p>
            </div>
            <div className="service-container">
              <p className="service-number">04</p>
              <img src="\sculpture-icon-black.png" alt="painting-icon" />
              <p className="service-title">Sculpture</p>
            </div>
          </div>
        </div>
      </div>
      {/* Art display container */}
      <div className="art-display">
        <div className="art-container sculpture">
          <p className="art-text sculpture">Sculpture</p>
          <img className="art-img" src="acrylic3.jpg" alt="sculpture" />
        </div>
        <div className="art-container digital">
           <p className="art-text digital">Digital Art</p>
          <img className="art-img" src="acrylic2.jpg" alt="digital art" />
        </div>
        <div className="art-container photography">
           <p className="art-text photography">Photography</p>
          <img className="art-img" src="acrylic1.jpg" alt="photography" />
        </div>
        <div className="art-container sketching">
           <p className="art-text sketching">Sketch & Painting</p>
          <img className="art-img" src="acrylic4.jpg" alt="sketch and painting" />
        </div>
        
        <button className="contact-button">Contact Me!</button>
        
      </div>
    </div>
  );
};

export default About;
