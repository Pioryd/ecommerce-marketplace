import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./index.scss";

import * as AccountSelector from "../../../redux/modules/account/selectors";

import * as CartActions from "../../../redux/modules/cart/actions";
import * as CartSelector from "../../../redux/modules/cart/selectors";

function Navigation() {
  const dispatch = useDispatch();

  const [itemsCount, setItemsCount] = useState(0);

  const token = useSelector(AccountSelector.getToken());
  const items = useSelector(CartSelector.getItems());

  const updateItemsCount = () => {
    let count = 0;

    if (items != null && token != null)
      for (const item of Object.values(items)) count += item.quantity;

    setItemsCount(count);
  };

  useEffect(() => updateItemsCount(), [items, token]);
  useEffect(() => dispatch(CartActions.get()), []);

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        {process.env.REACT_APP_NAME}
      </Link>
      <div className="links-block">
        <Link to="/cart" className="link">
          Cart ({itemsCount})
        </Link>
        <Link to="/account" className="link">
          Account
        </Link>
      </div>
    </div>
  );
}
export default Navigation;
