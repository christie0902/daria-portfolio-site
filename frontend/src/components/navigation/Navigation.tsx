import React, { useState, useContext } from "react";
import "./navigation.scss";
import NavItem from "./NavItem";
import ThemeContext from "../../lib/utilityComponents/themeContext";

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState("HOME");
  const { theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={`nav-container ${theme === 'dark' ? 'nav-dark-mode' : ''}`}>
        <button className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
          <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="WORK" section="Featured"/>
          <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="ABOUT" section="About"/>
          <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="CONTACT" section="Contact"/>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
