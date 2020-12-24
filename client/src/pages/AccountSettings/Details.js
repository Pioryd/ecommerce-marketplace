import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Group, Legend, Label } from "../../components/Layout/Controls";

import * as AccountSelector from "../../redux/modules/account/selectors";
import * as AccountActions from "../../redux/modules/account/actions";

function Details() {
  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());

  useEffect(() => dispatch(AccountActions.get()), []);

  return (
    <Group>
      <Legend>Details:</Legend>
      {account.email == null ||
      account.itemsWatching == null ||
      account.itemsSelling == null ? (
        "loading..."
      ) : (
        <Fragment>
          <Label>{"Email: " + account.email}</Label>
          <Label>{"Watching: " + account.itemsWatching.length}</Label>
          <Label>{"Selling: " + account.itemsSelling.length}</Label>
        </Fragment>
      )}
    </Group>
  );
}
export default Details;
