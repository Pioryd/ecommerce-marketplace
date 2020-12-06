import React from "react";
import AuctionsView from "../../components/auctions_view";

import "./index.scss";

function Auctions() {
  return (
    <React.Fragment>
      <h3 style={{ textAlign: "center" }}>Auctions</h3>
      <AuctionsView />
    </React.Fragment>
  );
}
export default Auctions;
