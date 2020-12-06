import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/title";

import "./index.scss";

const LINKS = {
  "My auctions": "/account-auctions",
  Fallowing: "/account-fallowing",
  "Create new auction": "/account-new-auction",
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
