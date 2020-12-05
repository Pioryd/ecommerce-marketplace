import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const ROUTE = {};

function Navigation() {
  return (
    <React.Fragment>
      <div className="navbar">
        {Object.keys(ROUTE).map((key) => (
          <Link key={key} to={ROUTE[key]} className="link">
            {key}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Navigation;
