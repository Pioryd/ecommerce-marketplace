import React from "react";

import {
  Group,
  Legend,
  Label,
  Input,
  Button,
  ButtonProcessing,
  Info
} from "../components/Layout/Controls";

const ITEM = {
  id: "145354453445",
  title: "Some title title title title title title",
  description: "Some description description description",
  price: "12",
  watching: false,
  expiration_date: "12:32 02-12.2022"
};

function Item(props) {
  // const {
  //   id,
  //   title,
  //   description,
  //   price,
  //   watching,
  //   expiration_date
  // } = props.item;

  return (
    <Group>
      <Label>{ITEM.title}</Label>
      <Label>{ITEM.watching ? "Watching" : "Add to watching"}</Label>
      <Label>Price: {ITEM.price}</Label>
      <Label>Expiration: {ITEM.expiration_date}</Label>
      <Label>{ITEM.description}</Label>
      <Label>ID: {ITEM.id}</Label>
      <Button>buy</Button>
    </Group>
  );
}

export default Item;
