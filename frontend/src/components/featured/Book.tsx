import React, { useEffect, useRef, useState, useContext } from "react";
// import { gallery } from "../../store/gallery-data.js";
import HTMLFlipBook from "react-pageflip";
import Page from "./Page.tsx";
import { Art } from "../../store/types.ts";
import ProjectDetailsModal from "../gallery/ProjectDetailsModal.tsx";
import ThemeContext from "../../lib/utilityComponents/themeContext.ts";

const Book: React.FC = () => {
  const book = useRef<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [featuredArts, setFeaturedArts] = useState<Art[]>([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const [artID, setArtID] = useState("");
  const { theme } = useContext(ThemeContext);
  const serverURL = "https://daria-server.levitsky.info";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const loadFeaturedArts = async () => {
      try {
        const response = await fetch(`${serverURL}/api/featured`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Fail to fetch");
        }
        const data = await response.json();
        setFeaturedArts(data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    loadFeaturedArts();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(featuredArts.length / 2);
  const flipBookWidth = isMobile ? 300 : 400;
  const flipBookHeight = isMobile ? 300 : 450;

  const handlePrevClick = () => {
    if (book && book.current) {
      book.current.pageFlip().flipPrev();
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  const handleNextClick = () => {
    if (book && book.current) {
      book.current.pageFlip().flipNext();
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    }
  };

  const showDetails = (art: Art) => {
    setArtID(art._id);
    setDetailsModal(true);
  };

  const onClose = () => {
    setDetailsModal(false);
  };

  return (
    <>
      {featuredArts.length > 0 ? (
        <div className="book-container">
          {/* @ts-ignore */}
          <HTMLFlipBook
            width={flipBookWidth}
            height={flipBookHeight}
            showCover={true}
            className="book"
            maxShadowOpacity={0}
            mobileScrollSupport={true}
            swipeDistance={50}
            useMouseEvents={true}
            usePortrait={true}
            flippingTime={500}
            showPageCorners={undefined}
            ref={(node) => {
              if (node !== null) {
                book.current = node;
              }
            }}
            onFlip={(e) => setCurrentPage(e.data)}
          >
            {/* Cover Page Open */}
            <div className="my-page cover-page front">
              {/* <img src="\name.png" alt="logo" />
              <h1>Art Book</h1> */}
            </div>

            {featuredArts?.map((art, index) => (
              <div className="my-page" key={`${art._id} ${index}`}>
                <Page
                  art={art}
                  title={art.title}
                  des={art.description}
                  img={art.images[0]}
                  showDetails={() => showDetails(art)}
                />
              </div>
            ))}

            {/* Cover Page Close */}
            <div className="my-page cover-page back">
              <a href="#Gallery">
                <button>
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
                </button>{" "}
              </a>
            </div>
          </HTMLFlipBook>

          <div className="pagination">
            <button onClick={handlePrevClick}>Back</button>
            <p className={`page-no ${theme === "dark" ? "dark-mode" : ""}`}>
              Page {currentPage * 2 + 1} & {currentPage * 2 + 2} of{" "}
              {totalPages * 2}
            </p>
            <button onClick={handleNextClick}>Next page</button>
          </div>
        </div>
      ) : (
        <div className="loading-wheel"> Loading please wait...</div>
      )}
      {detailsModal == true && (
        <ProjectDetailsModal id={artID} onClose={onClose} />
      )}
    </>
  );
};

export default Book;
