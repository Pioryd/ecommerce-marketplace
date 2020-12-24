import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import Title from "../components/Title";
import {
  Group,
  Label,
  Input,
  Textarea,
  Button,
  ButtonProcessing,
  Info
} from "../components/Layout/Controls";

import * as ItemsActions from "../redux/modules/items/actions";

function AccountListItem() {
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const list = async () => {
    setMessage(null);
    setProcessing(false);

    const error = await dispatch(
      ItemsActions.list({
        title,
        price,
        description
      })
    );

    // setTitle("");
    // setPrice("");
    // setDescription("");

    const successMessage = "Item listed.";
    setMessage(error || successMessage);
    setProcessing(false);
  };

  return (
    <Fragment>
      <Title name="Account - list item" />
      <Group>
        <Label>Title</Label>
        {message != null && <Info>{message}</Info>}
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Label>Description</Label>
        <Textarea
          type="text"
          id="description"
          name="description"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {processing === true ? (
          <ButtonProcessing />
        ) : (
          <Button onClick={list}>list</Button>
        )}
      </Group>
    </Fragment>
  );
}
export default AccountListItem;
