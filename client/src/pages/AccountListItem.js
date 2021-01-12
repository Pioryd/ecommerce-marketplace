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
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");

  const list = async () => {
    setMessage(null);
    setProcessing(false);

    const error = await dispatch(
      ItemsActions.list({
        title,
        price,
        stock,
        description
      })
    );

    if (error == null) {
      setTitle("");
      setPrice(0);
      setStock(0);
      setDescription("");

      setMessage(error || "Success: Item listed.");
    } else {
      setMessage("Failed: " + error);
    }

    setProcessing(false);
  };

  return (
    <Fragment>
      <Title name="Account - list item" />
      <Group>
        <Label>Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          maxLength="70"
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
        <Label>Stock</Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => {
            if (Number.isInteger(Number(e.target.value)))
              setStock(e.target.value);
          }}
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
        {message != null && <Info>{message}</Info>}
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
