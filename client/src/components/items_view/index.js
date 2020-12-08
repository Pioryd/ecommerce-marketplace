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

function ItemsView() {
  const [state_items, set_state_items] = React.useState({});

  React.useEffect(() => {
    const items = {};
    for (let i = 0; i < 10; i++) {
      items[`item_${i}`] = {
        image: "",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        price: 23.34,
        watching: false,
        date: "26.06.2021"
      };
    }
    set_state_items(items);
  }, []);

  return (
    <div className="auctions">
      {Object.keys(state_items).map((key) => (
        <Item key={key} data={state_items[key]} />
      ))}
    </div>
  );
}
export default ItemsView;
