import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "../components/NotFound";
import { Group, Label, Button } from "../components/Layout/Controls";
import Quantity from "../components/CartView/Quantity";

import * as CartActions from "../redux/modules/cart/actions";

import * as ItemsActions from "../redux/modules/items/actions";
import * as ItemsSelector from "../redux/modules/items/selectors";

export default function Item() {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const item = useSelector(ItemsSelector.getItem(id));

  const buy = () => {
    dispatch(CartActions.add({ id, quantity }));
    history.push("/order");
  };

  const addToCart = () => {
    dispatch(CartActions.add({ id, quantity }));
    history.push("/cart");
  };

  useEffect(() => {
    dispatch(ItemsActions.getSearch({ ids: [id] }));
    return () => dispatch(ItemsActions.clear());
  }, []);

  if (item == null) return <NotFound />;

  return (
    <Group>
      <Label>{item.title}</Label>
      <Label>{item.watching ? "Watching" : "Add to watching"}</Label>
      <Label>Price: {item.price}</Label>
      <Label>Expiration: {item.expiration_date}</Label>
      <Label>{item.description}</Label>
      <Label>ID: {item.id}</Label>
      <Button onClick={buy}>buy</Button>
      <Quantity
        updating={false}
        quantity={quantity}
        stock={item.stock}
        onUpdate={setQuantity}
      />
      <Button onClick={addToCart}>Add to cart</Button>
    </Group>
  );
}
