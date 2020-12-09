import React from "react";
import { useDispatch } from "react-redux";

import Title from "../../components/title";
import { Group, Legend, Label, Input, Button } from "../../components/controls";

import * as AccountActions from "../../redux/modules/account/actions";

export default function AccountSignIn() {
  const dispatch = useDispatch();

  const [state_login, set_state_login] = React.useState("");
  const [state_password, set_state_password] = React.useState("");

  const [state_create_name, set_state_create_name] = React.useState("");
  const [state_create_login, set_state_create_login] = React.useState("");
  const [state_create_password, set_state_create_password] = React.useState("");

  const [state_recover_login, set_state_recover_login] = React.useState("");

  const sign_in = () => {
    dispatch(
      AccountActions.sign_in({
        login: state_login,
        password: state_password
      })
    );
  };

  const create = () => {
    dispatch(
      AccountActions.create({
        name: state_create_name,
        login: state_create_name,
        password: state_create_password
      })
    );
  };

  const recover = () => {
    dispatch(
      AccountActions.recover({
        login: state_recover_login
      })
    );
  };

  return (
    <React.Fragment>
      <Title name="Account - sign in" />

      <Group>
        <Legend>Sign in</Legend>
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="login"
          name="login"
          value={state_login}
          onChange={(e) => set_state_login(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={state_password}
          onChange={(e) => set_state_password(e.target.value)}
        />
        <Button onClick={sign_in}>sign in</Button>
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
          value={state_create_name}
          onChange={(e) => set_state_create_name(e.target.value)}
        />
        <Label>Login(email)</Label>
        <Input
          type="email"
          id="login"
          name="login"
          value={state_create_login}
          onChange={(e) => set_state_create_login(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={state_create_password}
          onChange={(e) => set_state_create_password(e.target.value)}
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
          value={state_recover_login}
          onChange={(e) => set_state_recover_login(e.target.value)}
        />
        <Label>
          The new password will be sent to your email(login) and will be
          activated after first use during the sign in.
        </Label>
        <Button onClick={recover}>recover</Button>
      </Group>
    </React.Fragment>
  );
}
