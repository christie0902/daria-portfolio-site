import "./gallery.scss";
// import { gallery, GalleryObj } from "../../store/gallery-data.js";
import { useEffect, useState } from "react";
import { Art } from "../../store/types.ts";

const Gallery: React.FC = () => {
  const [arts, setArts] = useState<Art[]>([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedTab, setSelectedTab] = useState('all')

  useEffect(() => {
    const loadArts = async () => {
      try {
        const response = await fetch(`/api/arts?category=${selectedTab}`);
        if (!response.ok) {
          throw new Error("Fail to fetch");
        }
        const data = await response.json();
        setArts(data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    loadArts();
  }, [selectedTab]);

  return (
    <div className="gallery-section">
      <h1 className="section-title">MY WORK</h1>
      <div className="tabs">
        <button className="tab-button" onClick={()=>setSelectedTab('all')}>All</button>
        <button className="tab-button" onClick={()=>setSelectedTab('digital')}>Digital Art</button>
        <button className="tab-button" onClick={()=>setSelectedTab('sketch-painting')}>Sketch & Painting</button>
        <button className="tab-button" onClick={()=>setSelectedTab('photography')}>Photography</button>
        <button className="tab-button" onClick={()=>setSelectedTab('sculpture')}>Sculpture</button>
      </div>
      <div className="gallery">
     
        {arts.map((art, index) => (
          <div className="img-container" key={`${art.title} ${index}`}>
            <div
              className={`text-container ${
                hoverIndex === index ? "text-container-active" : ""
              }`}
            >
              <h3>{art.title}</h3>
              <p>{art.description}</p>
            </div>
            <img
              src={art.images[0]}
              alt={art.description}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={
                hoverIndex > -1 && hoverIndex !== index
                  ? { filter: "grayscale(80%)" }
                  : {}
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
