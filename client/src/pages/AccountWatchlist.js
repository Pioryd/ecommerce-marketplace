import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function AccountWatchlist() {
  return (
    <Fragment>
      <Title name="Account - watchlist" />
      <ItemsView searchType="watching" />
    </Fragment>
  );
}
export default AccountWatchlist;
