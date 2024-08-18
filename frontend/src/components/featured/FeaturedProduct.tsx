import { useEffect, useRef, useState, useContext } from "react";
import Book from "./Book";
import LazyLoader from "../../lib/utilityComponents/LazyLoader";
import "./featured.scss";
import ThemeContext from "../../lib/utilityComponents/themeContext";

const FeaturedProduct = () => {
  const elemRef = useRef(null);
  const [reference, setReference] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setReference(elemRef.current);
  }, [elemRef]);

  return (
    <div className={`feature-section ${theme === "dark" ? "dark-mode" : ""}`} ref={elemRef}>
      {reference && (
        <LazyLoader targetElement={reference}>
          <h1 className="section-title">Featured Art</h1>
          <div className="guide">
            <p className={`guide-text ${theme === "dark" ? "dark-mode" : ""}`}>Flip to explore!</p>
            {theme === 'dark' ? <img className="guide-img" src="arrow-dark-mode.png" alt="arrow" /> : <img className="guide-img" src="arrow.png" alt="arrow" />}
          </div>
          <div className="feature-container">
            <Book />
          </div>
        </LazyLoader>
      )}
    </div>
  );
};

export default FeaturedProduct;
