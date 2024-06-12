import React, { useState, useContext } from "react";
import "./navigation.scss";
import NavItem from "./NavItem";
import ThemeContext from "../../lib/utilityComponents/themeContext";


const Navigation = () => {
  const [currentPage, setCurrentPage] = useState("HOME");
  const { theme } = useContext(ThemeContext);

  return (
    <>
     <ul className={theme === 'dark' ? 'nav-dark-mode' : ''}>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="WORK" section="Featured"/>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="ABOUT" section="About"/>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="CONTACT" section="Contact"/>
      </ul>
    </>
  );
};

export default Navigation;
