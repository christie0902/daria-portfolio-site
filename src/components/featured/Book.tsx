import React, { useState } from "react";
import { gallery } from "../../store/gallery-data.js";

const Book: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const movePage = () => {
    setCurrentPage(currentPage + 2);
  };


  return (
    <div className="book">
      <div className="instruction">Open to view</div>
      <div className="pages">
        {/* Front Cover */}
        <div className={`page cover-front${currentPage === 0 ? " left-side" : ""}`}>
          <h1>Featured collection</h1>
          <h2>Daria Alexander</h2>
        </div>

       {/* Gallery Pages */}
       {gallery.map((item, index) => (
          <div key={index}>
            <div
              className={`page${index * 2 + 1 === currentPage ? " left-side" : ""}`}
              onClick={movePage}
            >
              <img src={item.img} alt={item.title} />
              <div className="text-container">
                <h1>{item.title}</h1>
                <p>{item.des}</p>
              </div>
            </div>
            <div
              className={`page${index * 2 + 2 === currentPage ? " left-side" : ""}`}
              onClick={movePage}
            >
              <img src={item.img} alt={item.title} />
              <div className="text-container">
                <h1>{item.title}</h1>
                <p>{item.des}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Book;
