import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import * as AccountSelector from "../../redux/modules/account/selectors";

import AccountSignIn from "../../pages/AccountSignIn";

export default function Account(props) {
  const account = useSelector(AccountSelector.get());

  return account.token == null ? <AccountSignIn /> : <Route {...props} />;
}
