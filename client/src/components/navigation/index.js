import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const LOGO = "e-commerce";

function Navigation() {
  return (
    <React.Fragment>
      <div className="navbar">
        <Link className="logo" to="/">
          {LOGO}
        </Link>
        <div className="links_block">
          <Link to="/account-fallowing" className="link">
            Fallowing
          </Link>
          <Link to="/account" className="link">
            Account
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Navigation;
