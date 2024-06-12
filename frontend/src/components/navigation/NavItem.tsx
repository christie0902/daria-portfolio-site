import React, { useContext } from "react";
import ThemeContext from "../../lib/utilityComponents/themeContext";

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
const { theme} = useContext(ThemeContext);

  return (
    <li>
    <a
      href={`#${section}`}
      onClick={() => setCurrentPage(title)}
      className={`nav-item ${
        currentPage === title ? "nav-item--active" : ""
      } ${theme === 'dark' ? 'nav-item--dark-mode' : ''}`}
    >
      {title}
    </a>
  </li>
  );
};

export default NavItem;
