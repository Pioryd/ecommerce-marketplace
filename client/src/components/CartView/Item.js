import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Quantity from "./Quantity";

import "./index.scss";

const STYLE_DISABLED = { color: "grey" };

export default function Item({ data, updating, onRemove, onUpdateQuantity }) {
  const [price, setPrice] = useState(data.price);
  const [total, setTotal] = useState(data.price * data.quantity);

  useEffect(() => {
    setPrice(
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR"
      }).format(data.price)
    );
    setTotal(
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR"
      }).format(data.price * data.quantity)
    );
  }, [data]);

  return (
    <div className="y4k_item">
      {updating === true ? (
        <div className="y4k_title" style={updating ? STYLE_DISABLED : {}}>
          {data.title}
        </div>
      ) : (
        <Link style={{ clear: "both" }} to={`/item/${data.id}`}>
          <div className="y4k_title">{data.title}</div>
        </Link>
      )}
      <div className="y4k_total">Total: {total}</div>
      <div className="y4k_price">Price: {price}</div>
      <Quantity
        className="y4k_quantity"
        updating={updating}
        quantity={data.quantity}
        stock={data.stock}
        onUpdate={(quantity) => onUpdateQuantity(data.id, quantity)}
      />
      <button
        disabled={updating}
        className="y4k_remove"
        style={updating ? STYLE_DISABLED : {}}
        onClick={() => onRemove(data.id)}
      >
        remove
      </button>
      {/* )} */}
    </div>
  );
}
