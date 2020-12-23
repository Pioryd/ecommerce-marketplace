import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Label } from "../components/Controls";
import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

import * as ItemsSelector from "../redux/modules/items/selectors";
import * as ItemsActions from "../redux/modules/items/actions";

function AccountWatchlist() {
  const dispatch = useDispatch();

  const items = useSelector(ItemsSelector.get());

  useEffect(() => {
    dispatch(ItemsActions.getWatching());
    return () => dispatch(ItemsActions.clear());
  }, []);

  return (
    <Fragment>
      <Title name="Account - watchlist" />
      <ItemsView items={items} />
    </Fragment>
  );
}
export default AccountWatchlist;
