import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Hero from "./components/hero/Hero";
import FeaturedProduct from "./components/featured/FeaturedProduct";
import Gallery from "./components/gallery/Gallery";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import ThemeContext from "./lib/utilityComponents/themeContext";


function App() {
  const elemRef = useRef(null);
  const [reference, setReference] = useState(null);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    setReference(elemRef.current);
  }, [elemRef]);

  return (
    <ThemeContext.Provider value={ { theme, setTheme } }>
      <section id="Home">
        <Hero />
      </section>

      <section id="About" ref={elemRef}>
        <About reference={reference} />
      </section>

      <section id="Featured">
        <FeaturedProduct />
      </section>
      <section id="Gallery">
        <Gallery />
      </section>

      <section id="Contact">
        <Contact />
      </section>
    </ThemeContext.Provider>
  );
}

export default App;
