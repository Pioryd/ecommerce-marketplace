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

export default function Recover() {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const recover = async () => {
    setMessage(null);
    setProcessing(true);

    const error = await dispatch(
      AccountActions.recover({
        email: email
      })
    );

    if (mounted.current !== true) return;

    setEmail("");

    const successMessage = "New password has been sent.";
    setMessage(error || successMessage);
    setProcessing(false);
  };

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  if (process.env.REACT_APP_ACCOUNT_RECOVER_ENABLED === "false") return null;

  return (
    <Group id="account-recovery">
      <Legend>Account recovery</Legend>
      <Label>Email</Label>
      <Input
        type="email"
        id="emailOfRecover"
        name="emailOfRecover"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>
        The new password will be sent to your email(login) and will be activated
        after first use during the sign in.
      </Label>
      {message != null && <Info>{message}</Info>}
      {processing === true ? (
        <ButtonProcessing />
      ) : (
        <Button onClick={recover}>recover</Button>
      )}
    </Group>
  );
}
