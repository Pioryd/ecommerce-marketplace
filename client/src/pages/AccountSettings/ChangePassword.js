import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  Group,
  Legend,
  Label,
  Input,
  Button,
  ButtonProcessing,
  Info
} from "../../components/Layout/Controls";

import * as AccountActions from "../../redux/modules/account/actions";

function ChangePassword() {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewRepeat, setPasswordNewRepeat] = useState("");
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const change = async () => {
    if (passwordNew !== passwordNewRepeat) {
      setMessage("New passwords must be the same.");
      return;
    }

    setMessage(null);
    setProcessing(true);

    const error = await dispatch(
      AccountActions.update({
        newPassword: passwordNew,
        oldPassword: passwordOld
      })
    );

    if (mounted.current !== true) return;

    setPasswordNew("");
    setPasswordNewRepeat("");
    setPasswordOld("");

    const successMessage = "Password has been changed.";
    setMessage(error || successMessage);
    setProcessing(false);
  };

  useEffect(() => dispatch(AccountActions.get()), []);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  return (
    <Group>
      <Legend>Change password</Legend>
      {message != null && <Info>{message}</Info>}
      <Label>Current password</Label>
      <Input
        type="password"
        id="passwordOld"
        name="passwordOld"
        value={passwordOld}
        onChange={(e) => setPasswordOld(e.target.value)}
      />
      <Label>New password</Label>
      <Input
        type="password"
        id="passwordNew"
        name="passwordNew"
        value={passwordNew}
        onChange={(e) => setPasswordNew(e.target.value)}
      />
      <Label>Repeat new password</Label>
      <Input
        type="password"
        id="passwordNewRepeat"
        name="passwordNewRepeat"
        value={passwordNewRepeat}
        onChange={(e) => setPasswordNewRepeat(e.target.value)}
      />
      {processing === true ? (
        <ButtonProcessing />
      ) : (
        <Button onClick={change}>change</Button>
      )}
    </Group>
  );
}
export default ChangePassword;
