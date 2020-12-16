import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import { ButtonLink } from "../components/Controls";

import * as AccountActions from "../redux/modules/account/actions";

function Account() {
  const dispatch = useDispatch();

  const signOut = () => dispatch(AccountActions.signOut());

  return (
    <Fragment>
      <Title name="Account" />

      <ButtonLink to="/account/selling" text="Selling" />
      <ButtonLink to="/account/watchlist" text="Watchlist" />
      <ButtonLink to="/account/list-item" text="List item" />
      <ButtonLink to="/account/settings" text="Settings" />
      <ButtonLink to="/" text="Sign out" onClick={signOut} />
    </Fragment>
  );
}
export default Account;
