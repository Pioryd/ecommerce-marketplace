import React from "react";

import "./index.scss";

const ITEMS = {
  item_1: {
    image: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: 23.34,
    fallowing: false,
    date: "26.06.2021"
  },
  item_2: {
    image: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: 23.34,
    fallowing: false,
    date: "26.06.2021"
  },
  item_3: {
    image: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: 23.34,
    fallowing: false,
    date: "26.06.2021"
  }
};

function Item(props) {
  const { image, description, price, fallowing, date } = props.data;
  return (
    <div className="item">
      <div className="image">{image === "" ? "No image" : image}</div>
      <div className="description">{description}</div>
      <div className="date">{date}</div>

      <div className="price">{price}zł</div>
      <div className="fallowing">{fallowing ? "Fallowed" : "Fallow"}</div>
    </div>
  );
}

function AuctionsView() {
  return (
    <div className="auctions">
      {Object.keys(ITEMS).map((key) => (
        <Item key={key} data={ITEMS[key]} />
      ))}
    </div>
  );
}
export default AuctionsView;
