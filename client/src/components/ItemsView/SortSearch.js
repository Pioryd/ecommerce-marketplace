import React, { useState } from "react";

import { Select } from "../Layout/Controls";

import "./sortSearch.scss";

export default function Sort({ options, sort, update }) {
  const [search, setSearch] = useState("");

  return (
    <div className="z2h_main-content">
      <div className="z2h_search">
        <input
          className="z2h_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") update({ searchText: search });
          }}
        />
        <button
          className="z2h_button"
          onClick={() => update({ searchText: search })}
        >
          Search
        </button>
      </div>

      <div className="z2h_sort">
        <Select value={sort} onChange={(e) => update({ sort: e.target.value })}>
          <option value="">Select sort</option>
          {Object.keys(options).map((option) => (
            <option key={option} value={option}>
              {options[option]}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
