import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import { Group, Legend, Label, Input, Button } from "../components/Controls";

import * as AccountActions from "../redux/modules/account/actions";

export default function AccountSignIn() {
  const dispatch = useDispatch();

  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRepeatPassword, setCreateRepeatPassword] = useState("");

  const [recoverEmail, setRecoverEmail] = useState("");

  const signIn = () => dispatch(AccountActions.signIn({ email, password }));

  const create = () => {
    dispatch(
      AccountActions.create({
        email: createEmail,
        password: createPassword
      })
    );
  };

  const recover = () => {
    dispatch(
      AccountActions.recover({
        email: recoverEmail
      })
    );
  };

  return (
    <Fragment>
      <Title name="Account - sign in" />

      <Group>
        <Legend>Sign in</Legend>
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signIn}>sign in</Button>
        <Label>
          <a href="#account-recovery">Forgot password?</a>
        </Label>
      </Group>

      <Group>
        <Legend>Create account</Legend>
        <Label>Name</Label>
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="createEmail"
          name="createEmail"
          value={createEmail}
          onChange={(e) => setCreateEmail(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="createPassword"
          name="createPassword"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
        />
        <Label>Repeat password</Label>
        <Input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={createRepeatPassword}
          onChange={(e) => setCreateRepeatPassword(e.target.value)}
        />
        <Button onClick={create}>create account</Button>
      </Group>

      <Group id="account-recovery">
        <Legend>Account recovery</Legend>
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="recoverEmail"
          name="recoverEmail"
          value={recoverEmail}
          onChange={(e) => setRecoverEmail(e.target.value)}
        />
        <Label>
          The new password will be sent to your email(login) and will be
          activated after first use during the sign in.
        </Label>
        <Button onClick={recover}>recover</Button>
      </Group>
    </Fragment>
  );
}
