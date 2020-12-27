import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Pagination from "./Pagination";
import { Label } from "../Layout/Controls";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as ItemsSelector from "../../redux/modules/items/selectors";

import * as AccountActions from "../../redux/modules/account/actions";
import * as AccountSelector from "../../redux/modules/account/selectors";

import "./index.scss";

export default function ItemsView(props) {
  const { page } = useParams();

  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());
  const { totalPages, currentPage } = useSelector(
    ItemsSelector.getPagination()
  );

  const [itemsList, setItemsList] = useState([]);

  const toggleWatch = async (id) => {
    await dispatch(ItemsActions.toggleWatch({ id }));
    dispatch(AccountActions.get());
  };

  useEffect(() => {
    dispatch(ItemsActions.clear());
    dispatch(ItemsActions.getSearch({ page }));
  }, [page]);

  useEffect(() => {
    const list = [];

    if (props.items != null) {
      for (const item of Object.values(props.items))
        list.push({
          ...item,
          route: `/item/${item.id}`,
          watching:
            account.itemsWatching == null
              ? null
              : account.itemsWatching.includes(item.id)
        });
    }

    setItemsList(list);
  }, [props.items, account]);

  return (
    <div className="q7l_auctions">
      {props.items == null && (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      )}

      {itemsList.map((item) => (
        <Item key={item.id} data={item} toggleWatch={toggleWatch} />
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        route="/items"
      />
    </div>
  );
}

function Item({ data, toggleWatch }) {
  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    if (data.watching === true) toggleWatch(data.id);
    else history.push("/account");
  };

  return (
    <Link style={{ clear: "both" }} to={data.route}>
      <div className="q7l_item">
        <div className="q7l_title">{data.title}</div>
        <div className="q7l_expiration_date">{data.expiration_date}</div>
        <div className="q7l_price">{data.price}zł</div>
        <button className="q7l_watching" onClick={onClick}>
          {data.watching === true ? "Watching" : "Add to watchlist"}
        </button>
      </div>
    </Link>
  );
}
