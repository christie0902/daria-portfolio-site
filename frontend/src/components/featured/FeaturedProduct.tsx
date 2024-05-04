import React, { useEffect, useRef, useState } from "react";
import Book from "./Book";
import LazyLoader from "../../lib/utilityComponents/LazyLoader";
import "./featured.scss";

const FeaturedProduct = () => {
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);
  const elemRef = useRef(null);
  const [reference, setReference] = useState(null);

  useEffect(() => {
    setReference(elemRef.current);
  }, [elemRef]);

  return (

          <div className="feature-section" ref={elemRef}>
          {reference && (
        <LazyLoader targetElement={reference}>
            <h1 className="section-title">FEATURED ART</h1>
            <div className="guide">
              <p className="guide-text">Flip to explore!</p>
              <img className="guide-img" src="arrow.png" alt="arrow" />
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
