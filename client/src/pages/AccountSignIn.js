import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import Title from "../components/Title";
import { Group, Legend, Label, Input, Button } from "../components/Controls";

import * as AccountActions from "../redux/modules/account/actions";

export default function AccountSignIn() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [createName, setCreateName] = useState("");
  const [createLogin, setCreateLogin] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const [recoverLogin, setRecoverLogin] = useState("");

  const signIn = () => {
    dispatch(
      AccountActions.signIn({
        login: login,
        password: password
      })
    );
  };

  const create = () => {
    dispatch(
      AccountActions.create({
        name: createName,
        login: createName,
        password: createPassword
      })
    );
  };

  const recover = () => {
    dispatch(
      AccountActions.recover({
        login: recoverLogin
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
          id="login"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
        <Input
          type="text"
          id="name"
          name="name"
          value={createName}
          onChange={(e) => setCreateName(e.target.value)}
        />
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="login"
          name="login"
          value={createLogin}
          onChange={(e) => setCreateLogin(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
        />
        <Button onClick={create}>create account</Button>
      </Group>

      <Group id="account-recovery">
        <Legend>Account recovery</Legend>
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="recover"
          name="recover"
          value={recoverLogin}
          onChange={(e) => setRecoverLogin(e.target.value)}
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
