import React from "react";
import { useDispatch } from "react-redux";

import Title from "../../components/title";
import { ButtonLink } from "../../components/controls";

import * as AccountActions from "../../redux/modules/account/actions";

function Account() {
  const dispatch = useDispatch();

  const sign_out = () => dispatch(AccountActions.sign_out());

  return (
    <React.Fragment>
      <Title name="Account" />

      <ButtonLink to="/account-selling" text="Selling" />
      <ButtonLink to="/account-watchlist" text="Watchlist" />
      <ButtonLink to="/account-list-item" text="List item" />
      <ButtonLink to="/account-settings" text="Settings" />
      <ButtonLink to="/" text="Sign out" onClick={sign_out} />
    </React.Fragment>
  );
}
export default Account;
