import React from "react";
import Title from "../../components/title";

import "../../sass/form.scss";

function AccountNewAuction() {
  return (
    <React.Fragment>
      <Title name="Create new auction" />
      <form className="a4t_group" onSubmit={() => {}}>
        <label className="a4t_label">Title</label>
        <input className="a4t_input" type="text" id="title" />

        <label className="a4t_label">Price</label>
        <input className="a4t_input" type="number" id="price" />

        <label className="a4t_label">Count</label>
        <input className="a4t_input" type="number" id="count" />

        <label className="a4t_label">Description</label>
        <textarea
          className="a4t_textarea"
          type="text"
          id="description"
          rows={10}
        />

        <label className="a4t_label">Image</label>
        <input className="a4t_input" type="file" id="title" />

        <button className="a4t_button" type="submit">
          Create
        </button>
      </form>
    </React.Fragment>
  );
}
export default AccountNewAuction;
