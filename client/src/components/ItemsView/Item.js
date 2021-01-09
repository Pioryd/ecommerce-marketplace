import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

// options: showQuantity, showSold, showStock, allowClose
export default function Item({ data, toggleWatch, close, options = {} }) {
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [closeStatus, setCloseStatus] = useState(0);
  const [price, setPrice] = useState(
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: "EUR"
    }).format(data.price)
  );

  const onToggleWatch = (e) => {
    e.preventDefault();

    toggleWatch(data.id);
  };

  const onClose = (e) => {
    e.preventDefault();
    setCloseStatus(1);
  };

  const onConfirm = (e) => {
    e.preventDefault();
    close(data.id);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setCloseStatus(0);
  };

  useEffect(() => {
    setPrice(
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR"
      }).format(data.price)
    );

    if (options.showQuantity === true && data.quantity != null)
      setAdditionalInfo({ name: "Quantity", value: data.quantity });
    else if (options.showSold === true && data.sold != null)
      setAdditionalInfo({ name: "Sold", value: data.sold });
    else if (options.showStock === true && data.stock != null)
      setAdditionalInfo({ name: "Stock", value: data.stock });
    else setAdditionalInfo(null);
  }, [data]);

  return (
    <Link style={{ clear: "both" }} to={`/item/${data.id}`}>
      <div className="q7l_item">
        <div className="q7l_title">{data.title}</div>
        <div className="q7l_expiration_date">{data.expiration_date}</div>
        <div className="q7l_price">{price}</div>
        <button className="q7l_watching" onClick={onToggleWatch}>
          {data.watching === true ? "Watching" : "Add to watchlist"}
        </button>
        {additionalInfo != null && (
          <div className="q7l_additional-info">
            {additionalInfo.name}: {additionalInfo.value}
          </div>
        )}
        {options.allowClose === true && closeStatus === 0 && (
          <button className="q7l_close" onClick={onClose}>
            close
          </button>
        )}
        {options.allowClose === true && closeStatus === 1 && (
          <Fragment>
            <button className="q7l_close_confirm" onClick={onConfirm}>
              confirm
            </button>
            <button className="q7l_close_cancel" onClick={onCancel}>
              cancel
            </button>
          </Fragment>
        )}
      </div>
    </Link>
  );
}
