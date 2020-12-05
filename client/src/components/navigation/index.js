import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const LOGO = "e-commerce";
const LINKS = { Fallowing: "/account-fallowing", Account: "/account" };

function Navigation() {
  return (
    <React.Fragment>
      <div className="navbar">
        <Link className="logo" to="/">
          {LOGO}
        </Link>
        <div className="links_block">
          {Object.keys(LINKS).map((key) => (
            <Link key={key} to={LINKS[key]} className="link">
              {key}
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Navigation;
