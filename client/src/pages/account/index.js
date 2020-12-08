import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/title";

import "./index.scss";

const LINKS = {
  Selling: "/account-selling",
  Watchlist: "/account-watchlist",
  "List item": "/account-list-item",
  Settings: "/account-settings",
  Logout: "/"
};

function Account() {
  return (
    <React.Fragment>
      <Title name="Account" />
      {Object.keys(LINKS).map((key) => (
        <Link key={key} to={LINKS[key]} className="btn">
          {key}
        </Link>
      ))}
    </React.Fragment>
  );
}
export default Account;
