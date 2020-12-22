import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "../components/Title";
import {
  Group,
  Legend,
  Label,
  Input,
  Button,
  Info,
  ButtonDisabled
} from "../components/Controls";

import * as AccountSelector from "../redux/modules/account/selectors";
import * as AccountActions from "../redux/modules/account/actions";

const Processing = () => <ButtonDisabled>Processing...</ButtonDisabled>;

function AccountSettings() {
  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());

  const [passwordOldChange, setPasswordOldChange] = useState("");
  const [passwordNewOfChange, setPasswordNewOfChange] = useState("");
  const [passwordNewRepeatOfChange, setPasswordNewRepeatOfChange] = useState(
    ""
  );
  const [messageOfChange, setMessageOfChange] = useState(null);
  const [processingOfChange, setProcessingOfChange] = useState(false);

  const [passwordOfRemove, setPasswordOfRemove] = useState("");
  const [messageOfRemove, setMessageOfRemove] = useState(null);
  const [processingOfRemove, setProcessingOfRemove] = useState(false);

  const change = async () => {
    if (passwordNewOfChange !== passwordNewRepeatOfChange) {
      setMessageOfChange("New passwords must be the same.");
      return;
    }

    setMessageOfChange(null);
    setProcessingOfChange(true);
    const error = await dispatch(
      AccountActions.update({
        newPassword: passwordNewOfChange,
        oldPassword: passwordOldChange
      })
    );

    setPasswordNewOfChange("");
    setPasswordNewRepeatOfChange("");
    setPasswordOldChange("");

    const successMessage = "Password has been changed.";
    setMessageOfChange(error || successMessage);
    setProcessingOfChange(false);
  };

  const remove = async () => {
    setMessageOfRemove(null);
    setProcessingOfRemove(true);
    const error = await dispatch(
      AccountActions.remove({
        password: passwordOfRemove
      })
    );

    setPasswordOfRemove("");

    const successMessage = "Account has been removed.";
    setMessageOfRemove(error || successMessage);
    setProcessingOfRemove(false);
  };

  useEffect(() => dispatch(AccountActions.get()), []);

  return (
    <Fragment>
      <Title name="Account settings" />
      <Group>
        <Legend>Details:</Legend>
        {account.email == null ||
        account.itemsWatching == null ||
        account.itemsSelling == null ? (
          "loading..."
        ) : (
          <Fragment>
            <Label>{"Email: " + account.email}</Label>
            <Label>{"Watching: " + account.itemsWatching.length}</Label>
            <Label>{"Selling: " + account.itemsSelling.length}</Label>
          </Fragment>
        )}
      </Group>
      <Group>
        <Legend>Change password</Legend>
        {messageOfChange != null && <Info>{messageOfChange}</Info>}
        <Label>Current password</Label>
        <Input
          type="password"
          id="passwordOldChange"
          name="passwordOldChange"
          value={passwordOldChange}
          onChange={(e) => setPasswordOldChange(e.target.value)}
        />
        <Label>New password</Label>
        <Input
          type="password"
          id="passwordNewOfChange"
          name="passwordNewOfChange"
          value={passwordNewOfChange}
          onChange={(e) => setPasswordNewOfChange(e.target.value)}
        />
        <Label>Repeat new password</Label>
        <Input
          type="password"
          id="passwordNewRepeatOfChange"
          name="passwordNewRepeatOfChange"
          value={passwordNewRepeatOfChange}
          onChange={(e) => setPasswordNewRepeatOfChange(e.target.value)}
        />
        {processingOfChange === true ? (
          <Processing />
        ) : (
          <Button onClick={change}>change</Button>
        )}
      </Group>

      <Group>
        <Legend>Remove account</Legend>
        {messageOfRemove != null && <Info>{messageOfRemove}</Info>}
        <Label>Password</Label>
        <Input
          type="password"
          id="passwordOfRemove"
          name="passwordOfRemove"
          value={passwordOfRemove}
          onChange={(e) => setPasswordOfRemove(e.target.value)}
        />
        {processingOfRemove === true ? (
          <Processing />
        ) : (
          <Button onClick={remove}>remove</Button>
        )}
      </Group>
    </Fragment>
  );
}
export default AccountSettings;
