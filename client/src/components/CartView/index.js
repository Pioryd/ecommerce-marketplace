import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Label } from "../Layout/Controls";

import * as CartActions from "../../redux/modules/cart/actions";
import * as CartSelector from "../../redux/modules/cart/selectors";

import Item from "./Item";

import "./index.scss";

const STYLE_DISABLED = { color: "grey" };

export default function CartView() {
  const mounted = useRef(false);

  const dispatch = useDispatch();

  const items = useSelector(CartSelector.getItems());

  const [subtotal, setSubtotal] = useState(0);

  const [updating, setUpdating] = useState(false);

  const updateSubtotal = (quantity) => {
    if (items == null) return;

    let totalPrice = 0;
    for (const item of Object.values(items))
      totalPrice += item.price * item.quantity;

    setSubtotal(
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR"
      }).format(totalPrice)
    );
  };

  const reload = async () => {
    setUpdating(true);

    await dispatch(CartActions.clear());
    await dispatch(CartActions.get());

    if (mounted.current !== true) return;

    setUpdating(false);
  };

  const remove = async (id) => {
    setUpdating(true);

    await dispatch(CartActions.remove({ id }));
    await dispatch(CartActions.get());

    if (mounted.current !== true) return;

    setUpdating(false);
  };

  const updateQuantity = async (id, quantity) => {
    setUpdating(true);
    await dispatch(CartActions.update({ id, quantity }));
    await dispatch(CartActions.get());

    if (mounted.current !== true) return;

    setUpdating(false);
  };

  useEffect(() => updateSubtotal(), [items]);
  useEffect(() => reload(), []);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  return (
    <div className="y4k_content" style={updating ? STYLE_DISABLED : {}}>
      <div className="y4k_top-bar">
        <label className="y4k_subtotal">Subtotal: {subtotal}</label>
        {updating ? (
          <label
            className="y4k_checkout"
            style={updating ? STYLE_DISABLED : {}}
          >
            Go to checkout:
          </label>
        ) : (
          <Link to="/order" className="y4k_checkout">
            Go to checkout
          </Link>
        )}
      </div>

      {items == null ? (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      ) : (
        Object.values(items).map((item) => (
          <Item
            key={item.id}
            data={item}
            updating={updating}
            onRemove={remove}
            onUpdateQuantity={updateQuantity}
          />
        ))
      )}
    </div>
  );
}
