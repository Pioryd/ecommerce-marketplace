import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Label } from "../Controls";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as AccountActions from "../../redux/modules/account/actions";
import * as AccountSelector from "../../redux/modules/account/selectors";

import "./index.scss";

function Item(props) {
  const { id, title, price, watching, expiration_date } = props.item;

  return (
    <div className="item">
      <div className="title">{title}</div>
      <div className="expiration_date">{expiration_date}</div>
      <div className="price">{price}zł</div>
      <button className="watching" onClick={() => props.toggleWatch(id)}>
        {watching ? "Watching" : "Add to watchlist"}
      </button>
    </div>
  );
}

function ItemsView(props) {
  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());

  const [itemsList, setItemsList] = useState([]);

  const toggleWatch = async (id) => {
    await dispatch(ItemsActions.toggleWatch({ id }));
    dispatch(AccountActions.get());
  };

  useEffect(() => dispatch(AccountActions.get()), []);

  useEffect(() => {
    const list = [];

    if (account.itemsWatching != null && props.items != null) {
      for (const item of Object.values(props.items))
        list.push({
          ...item,
          watching: account.itemsWatching.includes(item.id)
        });
    }

    setItemsList(list);
  }, [props.items, account]);

  return (
    <div className="auctions">
      {props.items == null && (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      )}

      {itemsList.map((item) => (
        <Item key={item.id} item={item} toggleWatch={toggleWatch} />
      ))}
    </div>
  );
}
export default ItemsView;
