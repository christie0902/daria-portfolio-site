import React, {useContext} from "react";
import "./hero.scss";
import Navigation from "../navigation/Navigation";
import ThemeContext from "../../lib/utilityComponents/themeContext";

const Hero = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`hero ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className={`toggle-dark-mode ${theme === 'dark' ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
        {/* Toggle button for dark mode */}
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </div>
      <div className="left-section">
        <video className="background-video" autoPlay loop muted>
          <source src="hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="navbar">
          {theme === 'dark' ? <img src="logo-dark-mode.png" alt="logo" className="logo" /> :<img src="name.png" alt="logo" className="logo" />}
          
          <Navigation/>
        </div>
        <div className="titles">
          <h2 className={`${theme === 'dark' ? 'dark-mode' : ''}`}>DARIA ALEXANDER</h2>
          <h1>CREATIVE.</h1>
        </div>
        <div className="portfolio-link">
          <a href="#Featured" className={`link ${theme === 'dark' ? 'dark-mode' : ''}`}>
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
        <div className="title-role" >
          <p className={`${theme === 'dark' ? 'dark-mode' : ''}`}>ARTIST, ILLUSTRATOR & DESIGNER</p>
        </div>
        <div className="title-small">
          <p className={`${theme === 'dark' ? 'dark-mode' : ''}`}>WELCOME TO MY ART WORLD</p>
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
      <hr className="bottom-border" />
    </div>
  );
};

export default Hero;
