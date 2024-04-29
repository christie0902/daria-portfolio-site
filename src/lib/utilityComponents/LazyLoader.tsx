import React, { useState, useEffect, ReactNode } from "react";

const LazyLoader = ({
  targetElement,
  children,
}: {
  targetElement: Element | null;
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // observe the viewport
        rootMargin: "0px",
        threshold: 0.5, // adjust this threshold as needed
      }
    );

    observer.observe(targetElement as Element);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [targetElement]);

  return <div>{isVisible && children}</div>;
};

export default LazyLoader;
