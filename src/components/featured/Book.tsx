import React, { useRef, useState } from "react";
import { gallery } from "../../store/gallery-data.js";
import HTMLFlipBook from "react-pageflip";
import Page from "./Page.tsx";

const Book: React.FC = () => {
  const book = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(gallery.length / 2);

  const handlePrevClick = () => {
    book.current?.pageFlip().flipPrev();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    book.current?.pageFlip().flipNext();
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  return (
    <div className="book-container">
   
        <HTMLFlipBook
          width={400}
          height={500}
          showCover={true}
          className="book"
          maxShadowOpacity={false}
          mobileScrollSupport={true}
          swipeDistance={50}
          useMouseEvents={true}
          usePortrait={true}
          useLandscape={true}
          flippingTime={500}
          ref={(node) => {
            if (node !== null) {
              book.current = node;
            }
          }}
          onPageChange={(e) => setCurrentPage(e.data)}
        >
          {/* Cover Page Open */}
          <div className="my-page cover-page front">
     
            <img src="\name.png" alt="logo" />
            <h1>Art Collection</h1>
            <p>
              The collection of my special arts, includes illustration,
              sketching, 3D models, logo designs
            </p>
          </div>

          {/* Pages from Gallery */}
          {gallery.map((art) => (
            <div className="my-page" key={`art ${art.id}`}>
              <Page title={art.title} des={art.des} img={art.img} />
            </div>
          ))}

          {/* Cover Page Close */}
          <div className="my-page cover-page back">
            <button><a href="#Gallery">
              See all my works!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v10.793l2.646-2.647a.5.5 0 1 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 .708-.708L7.5 12.293V1.5A.5.5 0 0 1 8 1z"
                />
              </svg>
              </a>
            </button>
          </div>

        </HTMLFlipBook>

      <div className="pagination">
        <button onClick={handlePrevClick}>Back</button>
        <p className="page-no">
          Page {currentPage * 2 + 1} & {currentPage * 2 + 2} of {totalPages * 2}
        </p>
        <button onClick={handleNextClick}>Next page</button>
      </div>
    </div>
  );
};

export default Book;
