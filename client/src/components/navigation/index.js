import React from "react";

import "./index.scss";

const ROUTE = {
  About: "/about",
  Menu: "/menu",
  Gallery: "/gallery",
  Contact: "/contact"
};

// const ORDER_ONLINE_BUTTON = (
//   <a href="/menu" className="order_online_link">
//     ORDER ONLINE
//   </a>
// );

const ORDER_ONLINE_BUTTON = (
  <div className="order_online_link">ORDER ONLINE</div>
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
            <a key={key} href={ROUTE[key]}>
              {key}
            </a>
          ))}
        </div>
      )}
      <div className="navbar">
        {!state_sidebar_visible && ORDER_ONLINE_BUTTON}
        <button className="openbtn" onClick={toggle_sidebar}>
          {state_sidebar_visible ? "X" : "☰"}
        </button>
        {Object.keys(ROUTE).map((key) => (
          <a key={key} href={ROUTE[key]} className="top_link">
            {key}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Navigation;
