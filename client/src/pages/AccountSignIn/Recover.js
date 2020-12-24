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
  });

  return (
    <Group id="account-recovery">
      {message != null && <Info>{message}</Info>}
      <Legend>Account recovery</Legend>
      <Label>Email</Label>
      <Input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>
        The new password will be sent to your email(login) and will be activated
        after first use during the sign in.
      </Label>
      {processing === true ? (
        <ButtonProcessing />
      ) : (
        <Button onClick={recover}>recover</Button>
      )}
    </Group>
  );
}
