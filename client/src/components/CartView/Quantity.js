import React, { useState, useEffect, Fragment } from "react";

import "./quantity.scss";

export default function Quantity({
  updating,
  quantity,
  stock,
  onUpdate,
  className
}) {
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  const [inputValue, setInputValue] = useState(updatedQuantity);
  const [selectKeys, setSelectKeys] = useState([1]);

  useEffect(() => {
    setInputValue(updatedQuantity);

    // !=
    if (quantity != updatedQuantity) onUpdate(updatedQuantity);
  }, [updatedQuantity]);

  useEffect(() => {
    const keys = [];
    for (let i = 1; i <= 10 && i <= stock; i++) keys.push(i);
    setSelectKeys(keys);
  }, [quantity]);

  return (
    <div className={className}>
      <div className="c8a_content">
        <label className="c8a_qty-label">Qty:</label>
        {updatedQuantity < 10 ? (
          <select
            className="c8a_number"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
            disabled={updating}
          >
            {selectKeys.map((key) => (
              <option key={key} value={key}>
                {key === 10 ? "10+" : key}
              </option>
            ))}
          </select>
        ) : (
          <Fragment>
            <input
              className="c8a_number"
              value={inputValue}
              onChange={(e) =>
                setInputValue(Math.min(Math.max(e.target.value, 1), stock))
              }
              min={1}
              max={stock}
              disabled={updating}
            />
            <label className="c8a_stock-label">/ {stock}</label>
            {inputValue != quantity && ( // !=
              <button
                className="c8a_button"
                onClick={() => setUpdatedQuantity(inputValue)}
                disabled={updating}
              >
                Update
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
