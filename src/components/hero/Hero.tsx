import React from "react";
import "./hero.scss";
import Navigation from "../navigation/Navigation";

const Hero = () => {
  return (
    <div className="hero">
      <div className="left-section">
        <div className="navbar">
          <img src="name.png" alt="logo" className="logo" />
          <Navigation />
        </div>
        <div className="titles">
          <h2>DARIA ALEXANDER</h2>
          <h1>CREATIVE.</h1>
        </div>
        <div className="portfolio-link">
          <a href="#Featured" className="link">
            CHECK MY PORTFOLIO
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <path d="M1 12L19 12M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="title-role">
          <p>ARTIST, ILLUSTRATOR & DESIGNER</p>
        </div>
        <div className="title-small">
          <p>WELCOME TO MY ART WORLD</p>
        </div>
      </div>

      <div className="right-section">
      <div className="video-container">
          <video className="video" autoPlay loop muted>
            <source src="hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        <h2 className="title-right">ART PORTFOLIO</h2>
      </div>

      <hr className="top-border" />
      <hr className="bottom-border"/>
    </div>
  );
};

export default Hero;
