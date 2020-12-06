import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Account() {
  return (
    <div className="account">
      <p>Account</p>
      <p>
        <Link to="account-auctions">My auctions</Link>
      </p>
      <p>
        <Link to="account-fallowing">Fallowing</Link>
      </p>
      <p>
        <Link to="account-new-auction">New auction</Link>
      </p>
      <p>
        <Link to="account-settings">Settings</Link>
      </p>
    </div>
  );
}
export default Account;
