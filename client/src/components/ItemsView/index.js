import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Label } from "../Layout/Controls";

import usePaginationAndSortSearch from "./usePaginationAndSortSearch";

import * as ItemsActions from "../../redux/modules/items/actions";
import * as ItemsSelector from "../../redux/modules/items/selectors";

import * as AccountActions from "../../redux/modules/account/actions";
import * as AccountSelector from "../../redux/modules/account/selectors";

import Item from "./Item";
import SortSearch from "./SortSearch";
import Pagination from "./Pagination";

import "./index.scss";

const SORT_OPTIONS = {
  priceAsc: "Price: low to hight",
  priceDesc: "Price: hight to low",
  dateAsc: "Date: old to new",
  dateDesc: "Date: new to old"
};

export default function ItemsView({ searchType, options = {} }) {
  const { sort, page, searchText, update } = usePaginationAndSortSearch();

  const history = useHistory();

  const dispatch = useDispatch();

  const account = useSelector(AccountSelector.get());
  const items = useSelector(ItemsSelector.getItems());
  const { totalPages, currentPage } = useSelector(
    ItemsSelector.getPagination()
  );

  const [itemsList, setItemsList] = useState([]);

  const reload = () => {
    const actions = {
      general: "getSearch",

      watching: "getWatching",
      selling: "getSelling",
      sold: "getSold",
      unsold: "getUnsold",
      bought: "getBought"
    };

    dispatch(ItemsActions.clear());
    dispatch(ItemsActions[actions[searchType]]({ page, sort, searchText }));
    dispatch(AccountActions.get());
  };

  const toggleWatch = async (id) => {
    if (account.token == null) {
      history.push("/account");
    } else {
      await dispatch(ItemsActions.toggleWatch({ id }));
      reload();
    }
  };

  const close = async (id) => {
    await dispatch(ItemsActions.close({ id }));
    reload();
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

  useEffect(() => updateItemsList(), [items, account]);
  useEffect(() => reload(), [page, sort, searchText]);

  return (
    <div className="q7l_content">
      <SortSearch options={SORT_OPTIONS} sort={sort} update={update} />

      {totalPages == null && (
        <Label style={{ textAlign: "center" }}>loading...</Label>
      )}
      {itemsList.map((item) => (
        <Item
          key={item.id}
          data={item}
          toggleWatch={toggleWatch}
          close={close}
          options={options}
        />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        update={update}
      />
    </div>
  );
}
