import React from "react";

import "./index.scss";

function Item(props) {
  const { image, description, price, watching, date } = props.data;

  return (
    <div className="item">
      <div className="image">{image === "" ? "No image" : image}</div>
      <div className="description">{description}</div>
      <div className="date">{date}</div>

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
      {Object.keys(props.list).map((key) => (
        <Item key={key} data={props.list[key]} />
      ))}
    </div>
  );
}
export default ItemsView;
