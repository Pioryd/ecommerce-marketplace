import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Label } from "../Layout/Controls";

import useQuery from "../../hooks/useQuery";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as ItemsSelector from "../../redux/modules/items/selectors";

import * as AccountActions from "../../redux/modules/account/actions";
import * as AccountSelector from "../../redux/modules/account/selectors";

import SortSearch from "./SortSearch";
import Pagination from "./Pagination";

import "./index.scss";

export default function ItemsView({ searchType }) {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());
  const items = useSelector(ItemsSelector.getItems());
  const { totalPages, currentPage } = useSelector(
    ItemsSelector.getPagination()
  );

  const [itemsList, setItemsList] = useState([]);

  const [sort, setSort] = useState("priceAsc");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const reload = () => {
    const actions = {
      general: "getSearch",
      selling: "getSelling",
      watching: "getWatching"
    };

    dispatch(ItemsActions.clear());
    dispatch(ItemsActions[actions[searchType]]({ page, sort, searchText }));
    dispatch(AccountActions.get());

    history.push(`${location.pathname}?sort=${sort}&page=${page}`);
  };

  const toggleWatch = async (id) => {
    if (account.token == null) {
      history.push("/account");
    } else {
      await dispatch(ItemsActions.toggleWatch({ id }));
      reload();
    }
  };

  const updateItemsList = () => {
    const list = [];

    if (items != null) {
      for (const item of Object.values(items)) {
        list.push({
          ...item,
          watching:
            account.itemsWatching == null
              ? false
              : account.itemsWatching.includes(item.id)
        });
      }
    }

    setItemsList(list);
  };

  useEffect(() => {
    setPage(query.get("page") || 1);
    setSort(query.get("sort") || "dateAsc");
  }, [query]);

  useEffect(() => reload(), [history, dispatch, page, sort]);

  useEffect(() => updateItemsList(), [items, account]);

  return (
    <div className="q7l_auctions">
      <SortSearch sort={sort} onSortChange={setSort} onSearch={setSearchText} />

      {totalPages == null && (
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
  const onClick = (e) => {
    e.preventDefault();
    toggleWatch(data.id);
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
