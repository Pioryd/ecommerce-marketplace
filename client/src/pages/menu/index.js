import React from "react";

import "./index.scss";

function Menu() {
  return (
    <div className="row">
      <div className="categories">
        <ul>
          <li>The Flight</li>
          <li>The City</li>
          <li>The Island</li>
          <li>The Food</li>
        </ul>
      </div>

      <div className="products">
        <h1>The City</h1>
        <p>
          Chania is the capital of the Chania region on the island of Crete. The
          city can be divided in two parts, the old town and the modern city.
        </p>
      </div>

      <div className="promotions">
        <div className="aside">
          <h2>What?</h2>
          <p>Chania is a city on the island of Crete.</p>
          <h2>Where?</h2>
          <p>Crete is a Greek island in the Mediterranean Sea.</p>
          <h2>How?</h2>
          <p>You can reach Chania airport from all over Europe.</p>
        </div>
      </div>
    </div>
  );
}
export default Menu;
