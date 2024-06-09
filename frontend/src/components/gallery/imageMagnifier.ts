import React, { useState, HTMLAttributes } from "react";

interface ImageMagnifierProps extends HTMLAttributes<HTMLDivElement> {
    src: string;
    width?: string;
    height?: string;
    magnifierHeight?: number;
    magnifierWidth?: number;
    zoomLevel?: number;
  }

  const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    src,
    width,
    height,
    magnifierHeight = 100,
    magnifierWidth = 100,
    zoomLevel = 1.5,
    ...props
  }) => {
   const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width
      }}
    >
      <img
        src={src}
        style={{ height: height, width: width }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        alt={"img"}
      />

      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
          }}
        ></div>
      )}
    </div>
  );
};

export default ImageMagnifier;