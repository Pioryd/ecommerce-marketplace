import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { transaction } from "../util/validate";

import { useHistory } from "react-router-dom";

import {
  Group,
  Label,
  Info,
  Input,
  Radio,
  Button,
  Legend
} from "../components/Layout/Controls";
import Title from "../components/Title";

import * as CartActions from "../redux/modules/cart/actions";
import * as CartSelector from "../redux/modules/cart/selectors";

export default function Checkout(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const mounted = useRef(false);

  const items = useSelector(CartSelector.getItems());

  const [name, setName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const [payWith, setPayWith] = useState("");

  const [subtotal, setSubtotal] = useState("");

  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const updateSubtotal = () => {
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

  const confirm = async () => {
    setMessage(null);

    try {
      transaction({
        name,
        street1,
        street2,
        city,
        state,
        postalCode,
        phone,
        payWith
      });
    } catch (err) {
      setMessage(err.message);
      return;
    }

    setProcessing(true);

    const error = await dispatch(
      CartActions.transaction({
        name,
        street1,
        street2,
        city,
        state,
        postalCode,
        phone,
        payWith
      })
    );

    dispatch(CartActions.get({}));

    if (mounted.current !== true) return;

    if (error != null) dispatch(CartActions.setCheckoutFailure(error));
    history.push(error != null ? "/checkout-failure" : "/checkout-success");

    setProcessing(false);
  };

  useEffect(() => updateSubtotal(), [items]);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  if (processing === true)
    return (
      <Group>
        <Label style={{ textAlign: "center" }}>Processing...</Label>{" "}
      </Group>
    );

  return (
    <Fragment>
      <Title name="Checkout" />
      <Group>
        <Label>Name</Label>
        <Input
          type="text"
          id="Name"
          name="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Street</Label>
        <Input
          type="text"
          id="street1"
          name="street1"
          value={street1}
          onChange={(e) => setStreet1(e.target.value)}
        />
        <Label></Label>
        <Input
          type="text"
          id="street2"
          name="street2"
          value={street2}
          onChange={(e) => setStreet2(e.target.value)}
        />
        <Label>City</Label>
        <Input
          type="text"
          id="Name"
          name="Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Label>State</Label>
        <Input
          type="text"
          id="Name"
          name="Name"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Label>Postal code</Label>
        <Input
          type="text"
          id="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Label>Phone</Label>
        <Input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Group>
          <Legend>Pay with</Legend>
          <Radio
            type="radio"
            id="cashOnDelivery"
            name="cashOnDelivery"
            value="cashOnDelivery"
            checked={payWith === "cashOnDelivery"}
            label="Cash on delivery"
            onChange={(e) => setPayWith(e.target.value)}
          />
        </Group>

        <Label style={{ fontWeight: "bold" }}>Subtotal: {subtotal}</Label>
        {message != null && <Info>{message}</Info>}
        <Button onClick={confirm}>Confirm and pay</Button>
      </Group>
    </Fragment>
  );
}
