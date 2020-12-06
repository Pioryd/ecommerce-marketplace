import React from "react";
import AuctionsView from "../../components/auctions_view";
import Title from "../../components/title";

import "./index.scss";

function AccountFallowing() {
  return (
    <React.Fragment>
      <Title name="Fallowings" />
      <AuctionsView />
    </React.Fragment>
  );
}
export default AccountFallowing;
