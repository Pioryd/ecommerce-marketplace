import React from "react";
import AuctionsView from "../../components/auctions_view";

import "./index.scss";

function AccountAuctions() {
  return (
    <React.Fragment>
      <h3 style={{ textAlign: "center" }}>Account auctions</h3>
      <AuctionsView />
    </React.Fragment>
  );
}
export default AccountAuctions;
