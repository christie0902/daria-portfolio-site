import React from "react";

interface NavItemProps {
  title: string;
  currentPage: string;
  setCurrentPage: (title: string) => void;
  section: string;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  currentPage,
  setCurrentPage,
  section,
}) => {
  return (
    <li>
      <a
        href={`#${section}`}
        onClick={() => setCurrentPage(title)}
        className={`nav-item ${
          currentPage === title ? "nav-item--active" : ""
        }`}
      >
        {title}
      </a>
    </li>
  );
};

export default NavItem;
