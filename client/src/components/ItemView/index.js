import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Group, Label } from "../../components/Layout/Controls";

import NotFound from "../NotFound";
import Quantity from "../CartView/Quantity";

import * as CartActions from "../../redux/modules/cart/actions";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as ItemsSelector from "../../redux/modules/items/selectors";

import "./index.scss";

export default function Item({ id }) {
  const history = useHistory();

  const dispatch = useDispatch();

  const mounted = useRef(false);

  const [processing, setProcessing] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const item = useSelector(ItemsSelector.getItem(id));

  const buy = () => {
    history.push(`/checkout?id=${id}&price=${item.price}&quantity=${quantity}`);
  };

  const addToCart = async () => {
    history.push("/cart");

    await dispatch(CartActions.add({ id, quantity }));
    await dispatch(CartActions.get());
  };

  const reloadItem = async () => {
    setProcessing(true);

    await dispatch(ItemsActions.getSearch({ ids: [id] }));

    if (mounted.current !== true) return;

    setProcessing(false);
  };

  useEffect(() => {
    if (item == null) return;

    setPrice(
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR"
      }).format(item.price)
    );

    const date = new Date(item.expirationDate);
    setExpirationDate(date.toLocaleString());
  }, [item]);

  useEffect(() => {
    reloadItem();
    return () => dispatch(ItemsActions.clear());
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  if (item == null) return <NotFound />;

  if (processing === true)
    return (
      <Group>
        <Label style={{ textAlign: "center" }}>Loading...</Label>
      </Group>
    );

  return (
    <div className="h2n_content">
      <div className="h2n_row-top">
        <div className="h2n_col-left">
          <div className="h2n_title">{item.title}</div>
        </div>
        <div className="h2n_col-right">
          <div className="h2n_toggle-watch">
            {item.watching ? "Watching" : "Add to watching"}
          </div>
        </div>
      </div>
      <div className="h2n_row-center">
        <div className="h2n_col-left">
          <div className="h2n_price">Price: {price}</div>

          <Quantity
            className="h2n_quantity"
            updating={false}
            quantity={quantity}
            stock={item.stock}
            onUpdate={setQuantity}
          />
        </div>
        <div className="h2n_col-right">
          <button className="h2n_buy" onClick={buy}>
            Buy
          </button>
          <button className="h2n_add-to-cart" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>

      <div className="h2n_row-bottom">
        <div className="h2n_description">{item.description}</div>
        <div className="h2n_label">ID: {item.id}</div>
        <div className="h2n_label">Expiration: {expirationDate}</div>
      </div>
    </div>
  );
}
