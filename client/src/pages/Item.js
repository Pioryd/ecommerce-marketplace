import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import ItemView from "../components/ItemView";
import Title from "../components/Title";

export default function Item() {
  const { id } = useParams();

  return (
    <Fragment>
      <Title name="Cart" />
      <ItemView id={id} />
    </Fragment>
  );
}
