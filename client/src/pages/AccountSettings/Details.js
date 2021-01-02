import React, { useEffect } from "react";
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
      {account.id == null ? (
        "loading..."
      ) : (
        <Label>{"Email: " + account.id}</Label>
      )}
    </Group>
  );
}
export default Details;
