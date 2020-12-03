import React from "react";

import "./index.scss";

const ROUTE = { "#home": "Home", "#news": "News", "#contact": "Contact" };

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
          {Object.keys(ROUTE).map((key) => (
            <a key={key} href={key}>
              {ROUTE[key]}
            </a>
          ))}
        </div>
      )}
      <div className="navbar">
        <button className="openbtn" onClick={toggle_sidebar}>
          {state_sidebar_visible ? "X" : "☰"}
        </button>
        {Object.keys(ROUTE).map((key) => (
          <a key={key} href={key} className="top_link">
            {ROUTE[key]}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Navigation;
