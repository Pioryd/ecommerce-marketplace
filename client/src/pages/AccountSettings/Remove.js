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

function Remove() {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const remove = async () => {
    setMessage(null);
    setProcessing(true);

    const error = await dispatch(AccountActions.remove({ password: password }));

    if (mounted.current !== true) return;

    setPassword("");

    const successMessage = "Account has been removed.";
    setMessage(error || successMessage);
    setProcessing(false);
  };

  useEffect(() => dispatch(AccountActions.get()), []);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return (
    <Group>
      <Legend>Remove account</Legend>
      <Label>Password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message != null && <Info>{message}</Info>}
      {processing === true ? (
        <ButtonProcessing />
      ) : (
        <Button onClick={remove}>remove</Button>
      )}
    </Group>
  );
}
export default Remove;
