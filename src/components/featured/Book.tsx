import React, { useState } from "react";
import { gallery, GalleryObj } from "../../store/gallery-data.js";

const Book: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const nextPage = () => {
    setCurrentPage(currentPage + 2);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 2);
  };

  return (
    <div className="book">
      <div className="instruction">Open to view</div>
      <div className="pages">
        {/* Front Cover */}
        <div className="page cover-front">
          <h1>Featured collection</h1>
          <h2>Daria Alexander</h2>
        </div>

        {/* Gallery Pages */}
        {gallery.map((item, index) => (
          <div key={index}>
            {/* Image Page */}
            <div
              className={`page${index * 2 === currentPage ? " left-side" : ""}`}
              onClick={nextPage}
            >
              <img src={item.img} alt={item.title} />
              <h1>{item.title}</h1>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
