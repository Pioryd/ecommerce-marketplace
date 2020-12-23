import React from "react";

import { Label } from "../Controls";

import "./index.scss";

function Item(props) {
  const { title, price, description, watching, expiration_date } = props.data;

  return (
    <div className="item">
      <div className="description">{description}</div>
      <div className="expiration_date">{expiration_date}</div>

      <div className="price">{price}zł</div>
      <div className="watching">
        {watching ? "Watching" : "Add to watchlist"}
      </div>
    </div>
  );
}

function ItemsView(props) {
  return (
    <div className="auctions">
      {props.items == null ? (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      ) : (
        Object.keys(props.items).map((key) => (
          <Item key={key} data={props.items[key]} />
        ))
      )}
    </div>
  );
}
export default ItemsView;
