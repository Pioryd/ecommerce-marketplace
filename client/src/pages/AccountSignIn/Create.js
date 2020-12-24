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

export default function Create() {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [emailOfCreate, setEmailOfCreate] = useState("");
  const [passwordOfCreate, setPasswordOfCreate] = useState("");
  const [passwordRepeatOfCreate, setPasswordRepeatOfCreate] = useState("");
  const [messageOfCreate, setMessageOfCreate] = useState(null);
  const [processingOfCreate, setProcessingOfCreate] = useState(false);

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

    if (mounted.current !== true) return;
    if (error == null) return; // Redirect

    setMessageOfCreate(error);
    setProcessingOfCreate(false);
  };

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  return (
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
        <ButtonProcessing />
      ) : (
        <Button onClick={create}>create account</Button>
      )}
    </Group>
  );
}
