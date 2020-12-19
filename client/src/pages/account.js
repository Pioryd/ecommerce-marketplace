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

      <ButtonLink to="/account/selling" text="Selling">
        Selling
      </ButtonLink>
      <ButtonLink to="/account/watchlist" text="Watchlist">
        Watchlist
      </ButtonLink>
      <ButtonLink to="/account/list-item" text="List item">
        List item
      </ButtonLink>
      <ButtonLink to="/account/settings" text="Settings">
        Settings
      </ButtonLink>
      <ButtonLink to="/" text="Sign out" onClick={signOut}>
        Sign out
      </ButtonLink>
    </Fragment>
  );
}
export default Account;
