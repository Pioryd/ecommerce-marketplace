import React, { Fragment } from "react";

import Details from "./Details";
import ChangePassword from "./ChangePassword";
import Remove from "./Remove";

import Title from "../../components/Title";

function AccountSettings() {
  return (
    <Fragment>
      <Title name="Account - settings" />
      <Details />
      <ChangePassword />
      <Remove />
    </Fragment>
  );
}
export default AccountSettings;
