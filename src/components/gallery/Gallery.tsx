import "./gallery.scss";
import { gallery, GalleryObj } from "../../store/gallery-data.js";
import { useState } from "react";

const Gallery = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <>
    <h1 className="section-title">MY WORK</h1>
    <div className="gallery">
      {gallery.map((image: GalleryObj, index) => {
        return (
          <div className="img-container" key={`${image.title} ${index}`}>
        
              <div className={`text-container ${hoverIndex === index ? "text-container-active" : ""}`}>
                <h3>{image.title}</h3>
                <p>{image.des}</p>
              </div>
      
            <img
              src={image.img}
              alt={image.des}
              onMouseEnter={() => setHoverIndex(index)} 
              onMouseLeave={() => setHoverIndex(-1)}
              style={hoverIndex > -1 && hoverIndex !== index ? { filter: "grayscale(80%)" } : {}}
            />
          </div>
        );
      })}
    </div>
  </>
  );
};

export default Gallery;
