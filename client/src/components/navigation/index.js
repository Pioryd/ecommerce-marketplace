import React from "react";

import "./index.scss";

function Navigation() {
  return (
    <div className="navbar">
      <button className="openbtn" onclick="openNav()">
        ☰
      </button>
      <a href="#home" className="top_link">
        Home
      </a>
      <a href="#news" className="top_link">
        News
      </a>
      <a href="#contact" className="top_link">
        Contact
      </a>
    </div>
  );
}
export default Navigation;
