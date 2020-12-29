import React, { useState } from "react";

import { Select } from "../Layout/Controls";

import "./sortSearch.scss";

export default function Sort({ sort, onSortChange, onSearch }) {
  const [search, setSearch] = useState("");

  return (
    <div className="z2h_main-content">
      <div className="z2h_search">
        <input
          className="z2h_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(search);
          }}
        />
        <button className="z2h_button" onClick={() => onSearch(search)}>
          Search
        </button>
      </div>

      <div className="z2h_sort">
        <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Select sort</option>
          <option value="priceAsc">Price: low to hight</option>
          <option value="priceDesc">Price: hight to low</option>
          <option value="dateAsc">Date: old to new</option>
          <option value="dateDesc">Date: new to old</option>
        </Select>
      </div>
    </div>
  );
}
