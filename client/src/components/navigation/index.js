import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const ROUTE = {
  About: "/about",
  Menu: "/menu",
  Gallery: "/gallery",
  Contact: "/contact"
};
const ORDER_ONLINE_BUTTON = (
  <Link to="/menu" className="order-online-btn">
    ORDER ONLINE
  </Link>
);

function Navigation() {
  const [state_sidebar_visible, set_state_sidebar_visible] = React.useState(
    false
  );
  const toggle_sidebar = () =>
    set_state_sidebar_visible(!state_sidebar_visible);

  return (
    <React.Fragment>
      {state_sidebar_visible && (
        <div className="sidebar">
          {ORDER_ONLINE_BUTTON}

          {Object.keys(ROUTE).map((key) => (
            <Link key={key} to={ROUTE[key]} className="link">
              {key}
            </Link>
          ))}
        </div>
      )}
      <div className="navbar">
        {!state_sidebar_visible && ORDER_ONLINE_BUTTON}

        <button className="toggle-sidebar-btn" onClick={toggle_sidebar}>
          {state_sidebar_visible ? "X" : "☰"}
        </button>

        {Object.keys(ROUTE).map((key) => (
          <Link key={key} to={ROUTE[key]} className="link">
            {key}
          </Link>
        ))}

        <Link to="/cart" className="cart-btn">
          <div className="image" />
          <span className="stack" data-count="5" />
        </Link>
      </div>
    </React.Fragment>
  );
}
export default Navigation;
