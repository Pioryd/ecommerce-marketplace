import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import {
  Group,
  Legend,
  Label,
  Input,
  Button,
  ButtonDisabled,
  Info
} from "../components/Controls";

import * as AccountActions from "../redux/modules/account/actions";

const Processing = () => <ButtonDisabled>Processing...</ButtonDisabled>;

export default function AccountSignIn() {
  const dispatch = useDispatch();

  const [emailOfSignIn, setEmailOfSignIn] = useState("");
  const [passwordOfSignIn, setPasswordOfSignIn] = useState("");
  const [messageOfSignIn, setMessageOfSignIn] = useState(null);
  const [processingOfSignIn, setProcessingOfSignIn] = useState(false);

  const [emailOfCreate, setEmailOfCreate] = useState("");
  const [passwordOfCreate, setPasswordOfCreate] = useState("");
  const [passwordRepeatOfCreate, setPasswordRepeatOfCreate] = useState("");
  const [messageOfCreate, setMessageOfCreate] = useState(null);
  const [processingOfCreate, setProcessingOfCreate] = useState(false);

  const [emailOfRecover, setEmailOfRecover] = useState("");
  const [messageOfRecover, setMessageOfRecover] = useState(null);
  const [processingOfRecover, setProcessingOfRecover] = useState(false);

  const signIn = async () => {
    setMessageOfSignIn(null);
    setProcessingOfSignIn(true);
    const error = await dispatch(
      AccountActions.signIn({
        email: emailOfSignIn,
        password: passwordOfSignIn
      })
    );
    const successMessage = "Account has been signed in.";
    setMessageOfSignIn(error || successMessage);
    setProcessingOfSignIn(false);
  };

  const create = async () => {
    if (passwordOfCreate !== passwordRepeatOfCreate) {
      setMessageOfCreate("Passwords must be the same.");
      return;
    }

    setMessageOfCreate(null);
    setProcessingOfCreate(true);
    const error = await dispatch(
      AccountActions.create({
        email: emailOfCreate,
        password: passwordOfCreate
      })
    );
    const successMessage = "Account has been created.";
    setMessageOfCreate(error || successMessage);
    setProcessingOfCreate(false);
  };

  const recover = async () => {
    setMessageOfRecover(null);
    setProcessingOfRecover(true);
    const error = await dispatch(
      AccountActions.recover({
        email: emailOfRecover
      })
    );
    const successMessage = "New password has been sent.";
    setMessageOfRecover(error || successMessage);
    setProcessingOfRecover(false);
  };

  return (
    <Fragment>
      <Title name="Account - sign in" />

      <Group>
        <Legend>Sign in</Legend>
        {messageOfSignIn != null && <Info>{messageOfSignIn}</Info>}
        <Label>Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={emailOfSignIn}
          onChange={(e) => setEmailOfSignIn(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={passwordOfSignIn}
          onChange={(e) => setPasswordOfSignIn(e.target.value)}
        />
        {processingOfSignIn === true ? (
          <Processing />
        ) : (
          <Button onClick={signIn}>sign in</Button>
        )}
        <Label>
          <a href="#account-recovery">Forgot password?</a>
        </Label>
      </Group>

      <Group>
        <Legend>Create account</Legend>
        {messageOfCreate != null && <Info>{messageOfCreate}</Info>}
        <Label>Email</Label>
        <Input
          type="email"
          id="emailOfCreate"
          name="emailOfCreate"
          value={emailOfCreate}
          onChange={(e) => setEmailOfCreate(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="passwordOfCreate"
          name="passwordOfCreate"
          value={passwordOfCreate}
          onChange={(e) => setPasswordOfCreate(e.target.value)}
        />
        <Label>Repeat password</Label>
        <Input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={passwordRepeatOfCreate}
          onChange={(e) => setPasswordRepeatOfCreate(e.target.value)}
        />
        {processingOfCreate === true ? (
          <Processing />
        ) : (
          <Button onClick={create}>create account</Button>
        )}
      </Group>

      <Group id="account-recovery">
        {messageOfRecover != null && <Info>{messageOfRecover}</Info>}
        <Legend>Account recovery</Legend>
        <Label>Email</Label>
        <Input
          type="email"
          id="emailOfRecover"
          name="emailOfRecover"
          value={emailOfRecover}
          onChange={(e) => setEmailOfRecover(e.target.value)}
        />
        <Label>
          The new password will be sent to your email(login) and will be
          activated after first use during the sign in.
        </Label>
        {processingOfRecover === true ? (
          <Processing />
        ) : (
          <Button onClick={recover}>recover</Button>
        )}
      </Group>
    </Fragment>
  );
}
