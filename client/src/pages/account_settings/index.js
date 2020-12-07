import React from "react";
import Title from "../../components/title";

import "../../sass/form.scss";

function AccountSettings() {
  return (
    <React.Fragment>
      <Title name="Account settings" />
      <div className="a4t_group">
        <label className="a4t_label">New email address</label>
        <input
          className="a4t_input"
          type="email"
          id="email"
          name="email"
          placeholder="new email"
        />
        <button className="a4t_button">change</button>
      </div>
    </React.Fragment>
  );
}
export default AccountSettings;
