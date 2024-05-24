import "./gallery.scss";
// import { gallery, GalleryObj } from "../../store/gallery-data.js";
import { useEffect, useState } from "react";
import { Art } from "../../store/types.ts";
import ProjectDetailsModal from "./ProjectDetailsModal.tsx";

const Gallery: React.FC = () => {
  const [arts, setArts] = useState<Art[]>([]);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [selectedTab, setSelectedTab] = useState("all");
  const [detailsModal, setDetailsModal] = useState(false);
  const [artID, setArtID] = useState('');

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

  const showDetails = (art: Art) =>{
    
    setArtID(art._id);
    setDetailsModal(true);
  }

  const onClose = () => {
    setDetailsModal(false);
  }

  return (
    <div className="gallery-section">
      <h1 className="section-title">MY WORK</h1>
      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === "all" ? "selected" : ""}`}
          onClick={() => setSelectedTab("all")}
        >
          All
        </button>
        <button
          className={`tab-button ${
            selectedTab === "digital" ? "selected" : ""
          }`}
          onClick={() => setSelectedTab("digital")}
        >
          Digital Art
        </button>
        <button
          className={`tab-button ${
            selectedTab === "sketch-painting" ? "selected" : ""
          }`}
          onClick={() => setSelectedTab("sketch-painting")}
        >
          Sketch & Painting
        </button>
        <button
          className={`tab-button ${
            selectedTab === "photography" ? "selected" : ""
          }`}
          onClick={() => setSelectedTab("photography")}
        >
          Photography
        </button>
        <button
          className={`tab-button ${
            selectedTab === "sculpture" ? "selected" : ""
          }`}
          onClick={() => setSelectedTab("sculpture")}
        >
          Sculpture
        </button>
      </div>
      <div className="gallery">
        {arts.map((art, index) => (
          <div className="img-container" key={`${art._id}`} onClick={() => showDetails(art)}>
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
      {detailsModal == true && <ProjectDetailsModal id={artID} onClose={onClose}/>}
    </div>
  );
};

export default Gallery;
