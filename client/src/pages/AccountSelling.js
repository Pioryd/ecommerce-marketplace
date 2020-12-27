import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

import * as ItemsSelector from "../redux/modules/items/selectors";
import * as ItemsActions from "../redux/modules/items/actions";

function AccountSelling() {
  const dispatch = useDispatch();

  const items = useSelector(ItemsSelector.getItems());

  useEffect(() => {
    dispatch(ItemsActions.getSelling());
    return () => dispatch(ItemsActions.clear());
  }, []);

  return (
    <Fragment>
      <Title name="Account - selling" />
      <ItemsView items={items} />
    </Fragment>
  );
}
export default AccountSelling;
