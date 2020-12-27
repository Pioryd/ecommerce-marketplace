import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Group, Select, Legend, Label } from "../Layout/Controls";

import useQuery from "../../hooks/useQuery";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as ItemsSelector from "../../redux/modules/items/selectors";

import * as AccountActions from "../../redux/modules/account/actions";
import * as AccountSelector from "../../redux/modules/account/selectors";

import Pagination from "./Pagination";

import "./index.scss";

export default function ItemsView(props) {
  const query = useQuery();
  const history = useHistory();

  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());
  const { totalPages, currentPage } = useSelector(
    ItemsSelector.getPagination()
  );

  const [itemsList, setItemsList] = useState([]);

  const [sort, setSort] = useState("priceAsc");
  const [page, setPage] = useState(1);

  const toggleWatch = async (id) => {
    await dispatch(ItemsActions.toggleWatch({ id }));
    dispatch(AccountActions.get());
  };

  const updateItemsList = () => {
    const list = [];

    if (props.items != null) {
      for (const item of Object.values(props.items)) {
        list.push({
          ...item,
          watching:
            account.itemsWatching == null
              ? null
              : account.itemsWatching.includes(item.id)
        });
      }
    }

    setItemsList(list);
  };

  useEffect(() => {
    dispatch(ItemsActions.clear());
    dispatch(ItemsActions.getSearch({ page, sort }));

    history.push(`/items?sort=${sort}&page=${page}`);
  }, [history, dispatch, page, sort]);

  useEffect(() => {
    setPage(query.get("page") || 1);
    setSort(query.get("sort") || "dateAsc");
  }, [query]);

  useEffect(() => updateItemsList(), [props.items, account]);

  return (
    <div className="q7l_auctions">
      <Group>
        <Legend>Sort</Legend>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Select sort</option>
          <option value="priceAsc">Price: low to hight</option>
          <option value="priceDesc">Price: hight to low</option>
          <option value="dateAsc">Date: old to new</option>
          <option value="dateDesc">Date: new to old</option>
        </Select>
      </Group>

      {props.items == null && (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      )}
      {itemsList.map((item) => (
        <Item key={item.id} data={item} toggleWatch={toggleWatch} />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setPage(page)}
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
    <Link style={{ clear: "both" }} to={`/item/${data.id}`}>
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
