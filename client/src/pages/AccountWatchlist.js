import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

import * as ItemsSelector from "../redux/modules/items/selectors";
import * as AccountSelector from "../redux/modules/account/selectors";

function AccountWatchlist() {
  const account = useSelector(AccountSelector.get());
  const list = useSelector(ItemsSelector.getList(account.watchlist));

  return (
    <Fragment>
      <Title name="Watchlist" />
      <ItemsView list={list} />
    </Fragment>
  );
}
export default AccountWatchlist;
