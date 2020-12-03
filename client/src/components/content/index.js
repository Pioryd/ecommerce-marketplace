import React from "react";

import "./index.css";

function Content() {
  return (
    <div className="row">
      <div className="col-3 col-s-3 menu">
        <ul>
          <li>The Flight</li>
          <li>The City</li>
          <li>The Island</li>
          <li>The Food</li>
        </ul>
      </div>

      <div className="col-6 col-s-9">
        <h1>The City</h1>
        <p>
          Chania is the capital of the Chania region on the island of Crete. The
          city can be divided in two parts, the old town and the modern city.
        </p>
      </div>

      <div className="col-3 col-s-12">
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
export default Content;
