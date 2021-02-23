import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import { ButtonLink } from "../components/Layout/Controls";

import * as AccountActions from "../redux/modules/account/actions";

function Account() {
  const dispatch = useDispatch();

  const signOut = () => dispatch(AccountActions.signOut());

  return (
    <Fragment>
      <Title name="Account" />
      <ButtonLink to="/account/watchlist">Watchlist</ButtonLink>
      <ButtonLink to="/account/bought">Bought</ButtonLink>
      <ButtonLink to="/account/list-item" style={{ fontWeight: "bold" }}>
        List item
      </ButtonLink>
      <ButtonLink to="/account/selling">Selling</ButtonLink>
      <ButtonLink to="/account/sold">Sold</ButtonLink>
      <ButtonLink to="/account/unsold">Unsold</ButtonLink>
      <ButtonLink to="/account/settings">Settings</ButtonLink>
      <ButtonLink to="/" onClick={signOut}>
        Sign out
      </ButtonLink>
    </Fragment>
  );
}
export default Account;
