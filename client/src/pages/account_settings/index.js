import React from "react";
import Title from "../../components/title";

import "./index.scss";

function AccountSettings() {
  return (
    <React.Fragment>
      <Title name="Account settings" />
      <div className="group">
        <label>Email</label>
        <input type="email" id="email" name="email" placeholder="new email" />
        <button>change</button>
      </div>
    </React.Fragment>
  );
}
export default AccountSettings;
