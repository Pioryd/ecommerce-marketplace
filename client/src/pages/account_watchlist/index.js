import React from "react";
import ItemsView from "../../components/items_view";
import Title from "../../components/title";

function AccountWatchlist() {
  return (
    <React.Fragment>
      <Title name="Watchlist" />
      <ItemsView />
    </React.Fragment>
  );
}
export default AccountWatchlist;
