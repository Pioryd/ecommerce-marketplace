import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const LOGO = "e-commerce";

function Navigation() {
  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo" to="/">
          {LOGO}
        </Link>
        <div className="links-block">
          <Link to="/account/watchlist" className="link">
            Watchlist
          </Link>
          <Link to="/account" className="link">
            Account
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
export default Navigation;
