import React, { Fragment } from "react";
import Title from "../components/Title";
import { Group, Legend, Label, Input, Button } from "../components/Controls";

function AccountSettings() {
  return (
    <Fragment>
      <Title name="Account settings" />
      <Group>
        <Legend>Login(email):</Legend>
        <Label>some.email@email.com</Label>
      </Group>
      <Group>
        <Legend>Password</Legend>
        <Label>New password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="new password"
          value=""
        />
        <Label>Repeat new password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="new password"
        />
        <Button>change</Button>
      </Group>
    </Fragment>
  );
}
export default AccountSettings;
