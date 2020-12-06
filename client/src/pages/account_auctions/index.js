import React from "react";
import AuctionsView from "../../components/auctions_view";
import Title from "../../components/title";

import "./index.scss";

function AccountAuctions() {
  return (
    <React.Fragment>
      <Title name="My auctions" />
      <AuctionsView />
    </React.Fragment>
  );
}
export default AccountAuctions;
