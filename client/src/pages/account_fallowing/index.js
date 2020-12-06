import React from "react";
import AuctionsView from "../../components/auctions_view";

import "./index.scss";

function AccountFallowing() {
  return (
    <React.Fragment>
      <h3 style={{ textAlign: "center" }}>Account fallowing</h3>
      <AuctionsView />
    </React.Fragment>
  );
}
export default AccountFallowing;
