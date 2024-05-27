import React, { forwardRef, ForwardedRef } from 'react'
import { Art } from "../../store/types.ts";

interface PageProps {
    img: string;
    title: string;
    des: string;
    showDetails: (art: Art) => void;
  }

  const Page = forwardRef<HTMLDivElement, PageProps>(({ img, title, des, showDetails }, ref) => {
    return (
      <div className="page-content" ref={ref} >
        <h1>{title}</h1>
        <img src={`/uploads/${img}`} alt={title} />
        <button onClick={showDetails}>See details</button>
        <p>{des}</p>
      </div>
    );
  });
  

export default Page