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

export default function SignIn() {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const signIn = async () => {
    setMessage(null);
    setProcessing(true);
    const error = await dispatch(
      AccountActions.signIn({
        email: email,
        password: password
      })
    );

    if (mounted.current !== true) return;
    if (error == null) return; // Redirect

    setMessage(error);
    setProcessing(false);
  };

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  return (
    <Group>
      <Legend>Sign in</Legend>
      {message != null && <Info>{message}</Info>}
      <Label>Email</Label>
      <Input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {processing === true ? (
        <ButtonProcessing />
      ) : (
        <Button onClick={signIn}>sign in</Button>
      )}
      <Label>
        <a href="#account-recovery">Forgot password?</a>
      </Label>
    </Group>
  );
}
