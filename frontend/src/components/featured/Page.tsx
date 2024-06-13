import React, { forwardRef, ForwardedRef, useContext } from 'react'
import { Art } from "../../store/types.ts";
import ThemeContext from "../../lib/utilityComponents/themeContext";

interface PageProps {
    img: string;
    title: string;
    des: string;
    showDetails: (art: Art) => void;
  }

  const Page = forwardRef<HTMLDivElement, PageProps>(({ img, title, des, showDetails }, ref) => {
    const { theme } = useContext(ThemeContext);

    return (
      <div className="page-content" ref={ref} >
        <h1 className={`${theme === 'dark' ? 'dark-mode' : ''}`}>{title}</h1>
        <img src={`/uploads/${img}`} alt={title} />
        
        <p className={`${theme === 'dark' ? 'dark-mode' : ''}`}>{des}</p><button onClick={showDetails}>See details</button>
      </div>
    );
  });
  

export default Page