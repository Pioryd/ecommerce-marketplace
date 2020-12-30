import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Item({ data, toggleWatch, close, allowClose }) {
  const [closeStatus, setCloseStatus] = useState(0);

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

  return (
    <Link style={{ clear: "both" }} to={`/item/${data.id}`}>
      <div className="q7l_item">
        <div className="q7l_title">{data.title}</div>
        <div className="q7l_expiration_date">{data.expiration_date}</div>
        <div className="q7l_price">{data.price}zł</div>
        <button className="q7l_watching" onClick={onToggleWatch}>
          {data.watching === true ? "Watching" : "Add to watchlist"}
        </button>
        {allowClose === true && closeStatus === 0 && (
          <button className="q7l_close" onClick={onClose}>
            close
          </button>
        )}
        {allowClose === true && closeStatus === 1 && (
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
