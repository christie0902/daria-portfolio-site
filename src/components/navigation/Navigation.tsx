import React, { useState } from "react";
import "./navigation.scss";
import NavItem from "./NavItem";

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState("HOME");

  return (
    <>
      <ul>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="WORK" section="Featured"/>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="ABOUT" section="About"/>
        <NavItem currentPage={currentPage} setCurrentPage={setCurrentPage} title="CONTACT" section="Contact"/>
      </ul>
    </>
  );
};

export default Navigation;
