import React from "react";
import AuctionsView from "../../components/auctions_view";
import Title from "../../components/title";

import "./index.scss";

function Auctions() {
  return (
    <React.Fragment>
      <Title name="Auctions" />
      <AuctionsView />
    </React.Fragment>
  );
}
export default Auctions;
