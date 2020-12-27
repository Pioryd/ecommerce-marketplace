import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../components/NotFound";
import { Group, Label, Button } from "../components/Layout/Controls";

import * as ItemsActions from "../redux/modules/items/actions";
import * as ItemsSelector from "../redux/modules/items/selectors";

function Item(props) {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ItemsActions.getSearch({ ids: [id] }));
    return () => dispatch(ItemsActions.clear());
  }, []);

  const item = useSelector(ItemsSelector.getItem(id));

  if (item == null) return <NotFound />;

  return (
    <Group>
      <Label>{item.title}</Label>
      <Label>{item.watching ? "Watching" : "Add to watching"}</Label>
      <Label>Price: {item.price}</Label>
      <Label>Expiration: {item.expiration_date}</Label>
      <Label>{item.description}</Label>
      <Label>ID: {item.id}</Label>
      <Button>buy</Button>
    </Group>
  );
}

export default Item;
