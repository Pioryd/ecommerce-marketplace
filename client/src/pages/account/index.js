import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Account() {
  return (
    <div>
      <p>Account</p>
      <ul>
        <li>
          <Link to="account-auctions">Auctions</Link>
        </li>
        <li>
          <Link to="account-fallowed">Fallowing</Link>
        </li>
        <li>
          <Link to="account-new-auction">New auction</Link>
        </li>
        <li>
          <Link to="account-settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
export default Account;
