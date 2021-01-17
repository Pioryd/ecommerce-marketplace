import React, { Fragment } from "react";

import "./index.scss";

function Footer() {
  return (
    <Fragment>
      <div className="footer">
        <label>Open source project.</label>
        <a href={process.env.REACT_APP_GITHUB_URL}>Github</a>
      </div>
    </Fragment>
  );
}
export default Footer;
