import React, { Fragment } from "react";

import SignIn from "./SignIn";
import Create from "./Create";
import Recover from "./Recover";

import Title from "../../components/Title";

export default function AccountSignIn() {
  return (
    <Fragment>
      <Title name="Account - sign in" />
      <SignIn />
      <Create />
      <Recover />
    </Fragment>
  );
}
