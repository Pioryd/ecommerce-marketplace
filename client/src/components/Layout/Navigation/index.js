import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./index.scss";

import * as CartSelector from "../../../redux/modules/cart/selectors";

const LOGO = "e-commerce";

function Navigation() {
  const [itemsCount, setItemsCount] = useState(0);

  const items = useSelector(CartSelector.getItems());

  const updateItemsCount = () => {
    if (items == null) return;
    let count = 0;
    for (const item of Object.values(items)) count += item.quantity;
    setItemsCount(count);
  };

  useEffect(() => updateItemsCount(), [items]);

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        {LOGO}
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
