import React, { useContext } from "react";
import LazyLoader from "../../lib/utilityComponents/LazyLoader";
import "./about.scss";
import ThemeContext from "../../lib/utilityComponents/themeContext";
import imageScaler from "../../lib/utilityComponents/ImageScaler";

interface AboutProps {
  reference: HTMLDivElement | null;
}

const About: React.FC<AboutProps> = ({ reference }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {reference && (
        <LazyLoader targetElement={reference}>
          <div
            className={`about-container ${theme === "dark" ? "dark-mode" : ""}`}
          >
            <div className="left-container">
              <div className="title-container">
                <div className="about-title">
                  ABOUT
                  <br />
                  ME
                </div>
                <div className="text-container">
                  <p
                    className={`text-uppercase ${
                      theme === "dark" ? "dark-mode" : ""
                    }`}
                  >
                    I love the creative process, and am open to lots of
                    different styles and mediums. Let's make something!
                    I have been drawing since I could hold a crayon, and I am
                    always trying to improve. I have fun learning new ways to
                    make art, and look forward to using my skills to make your
                    ideas a reality.
                  </p>
                  {/* <p
                    className={`text-lowercase ${
                      theme === "dark" ? "dark-mode" : ""
                    }`}
                  >
                    I have been drawing since I could hold a crayon, and I am
                    always trying to improve. I have fun learning new ways to
                    make art, and look forward to using my skills to make your
                    ideas a reality.
                  </p> */}
                </div>
              </div>

              <div className="bottom-container">
                <h2 className={`${theme === "dark" ? "dark-mode" : ""}`}>
                  MY SERVICES
                </h2>
                <div className="services-container">
                  <div className="service-container">
                    <p
                      className={`service-number ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      01
                    </p>
                    {theme === "dark" ? (
                      <img src="\painting-icon-white.png" alt="painting-icon" />
                    ) : (
                      <img src="\painting-icon-black.png" alt="painting-icon" />
                    )}
                    <p
                      className={`service-title ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      Sketch & Painting
                    </p>
                  </div>
                  <div className="service-container">
                    <p
                      className={`service-number ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      02
                    </p>
                    {theme === "dark" ? (
                      <img src="\digital-icon-white.png" alt="painting-icon" />
                    ) : (
                      <img src="\digital-icon-black.png" alt="painting-icon" />
                    )}

                    <p
                      className={`service-title ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      Digital Art
                    </p>
                  </div>
                  <div className="service-container">
                    <p
                      className={`service-number ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      03
                    </p>
                    {theme === "dark" ? (
                      <img src="\camera-icon-white.png" alt="painting-icon" />
                    ) : (
                      <img src="\camera-icon-black.png" alt="painting-icon" />
                    )}
                    <p
                      className={`service-title ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      Photography
                    </p>
                  </div>
                  <div className="service-container">
                    <p
                      className={`service-number ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      04
                    </p>
                    {theme === "dark" ? (
                      <img
                        src="\sculpture-icon-white.png"
                        alt="painting-icon"
                      />
                    ) : (
                      <img
                        src="\sculpture-icon-black.png"
                        alt="painting-icon"
                      />
                    )}
                    <p
                      className={`service-title ${
                        theme === "dark" ? "dark-mode" : ""
                      }`}
                    >
                      Sculpture
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Art display container */}
            <div className="art-display">
              <div>
                <div className="art-container sculpture">
                  <p className="art-text sculpture">Sculpture</p>
                  <img
                    className="art-img"
                    src={imageScaler(
                      "https://res.cloudinary.com/dcwrof2zr/image/upload/v1721160994/signal-2024-07-16-161349_w2q15f.jpg",
                      30
                    )}
                    alt="sculpture"
                  />
                </div>
                <div className="art-container digital">
                  <p className="art-text digital">Digital Art</p>
                  <img
                    className="art-img"
                    src={imageScaler(
                      "https://res.cloudinary.com/dcwrof2zr/image/upload/v1720367902/e7914ff0-5745-44d5-9281-59f9ac349127_gzifio.png",
                      30
                    )}
                    alt="digital art"
                    />
                </div>
                <div className="art-container photography">
                  <p className="art-text photography">Photography</p>
                  <img
                    className="art-img"
                    src={imageScaler(
                      "https://res.cloudinary.com/dcwrof2zr/image/upload/v1720362350/img010_hzojbm.jpg",
                      30
                    )}
                    alt="photography"
                  />
                </div>
                <div className="art-container sketching">
                  <p className="art-text sketching">Sketch & Painting</p>
                  <img
                    className="art-img"
                    src={imageScaler(
                      "https://res.cloudinary.com/dcwrof2zr/image/upload/v1720362364/img001_mykyve.jpg",
                      30
                    )}
                    alt="sketch and painting"
                  />
                </div>
              </div>
            </div>
          </div>
        </LazyLoader>
      )}
    </>
  );
};

export default About;
