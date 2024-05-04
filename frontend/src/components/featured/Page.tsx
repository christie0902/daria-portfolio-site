import React, { forwardRef, ForwardedRef } from 'react'

interface PageProps {
    img: string;
    title: string;
    des: string;
  }

  const Page = forwardRef<HTMLDivElement, PageProps>(({ img, title, des }, ref) => {
    return (
      <div className="page-content" ref={ref}>
        <h1>{title}</h1>
        <img src={img} alt={title} />
        <p>{des}</p>
      </div>
    );
  });
  

export default Page