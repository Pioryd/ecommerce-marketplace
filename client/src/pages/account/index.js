import React from "react";
import Title from "../../components/title";
import { ButtonLink } from "../../components/controls";

const LINKS = {
  Selling: "/account-selling",
  Watchlist: "/account-watchlist",
  "List item": "/account-list-item",
  Settings: "/account-settings",
  Logout: "/"
};

function Account() {
  return (
    <React.Fragment>
      <Title name="Account" />

      {Object.keys(LINKS).map((key) => (
        <ButtonLink key={key} to={LINKS[key]}>
          {key}
        </ButtonLink>
      ))}
    </React.Fragment>
  );
}
export default Account;
