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
  const [artID, setArtID] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await fetch(
          `/api/arts?category=${selectedTab}&page=${currentPage}&pageSize=${itemsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Fail to fetch");
        }
        const { arts, totalPages } = await response.json();
        setArts(arts);
        setTotalPages(totalPages);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchArts();
  }, [selectedTab, currentPage, itemsPerPage]);

  const showDetails = (art: Art) => {
    setArtID(art._id);
    setDetailsModal(true);
  };

  const onClose = () => {
    setDetailsModal(false);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          <div
            className="img-container"
            key={`${art._id}`}
            onClick={() => showDetails(art)}
          >
            <div
              className={`text-container ${
                hoverIndex === index ? "text-container-active" : ""
              }`}
            >
              <h3>{art.title}</h3>
              <p>{art.description}</p>
            </div>
            <img
              src={`/uploads/${art.images[0]}`}
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

      {/* Pagination */}
      <div className="pagination">
        {totalPages && totalPages > 1 && (
          <ul className="pagination-list">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`pagination-item ${
                  currentPage === page ? "active" : ""
                }`}
              >
                <button onClick={() => paginate(page)}>{page}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {detailsModal == true && (
        <ProjectDetailsModal id={artID} onClose={onClose} />
      )}
    </div>
  );
};

export default Gallery;
