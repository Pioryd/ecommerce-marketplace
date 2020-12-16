import React, { Fragment } from "react";
import Title from "../components/title";
import { Group, Label, Input, Textarea, Button } from "../components/controls";

function AccountListItem() {
  return (
    <Fragment>
      <Title name="List item" />
      <Group>
        <Label>Title</Label>
        <Input type="text" id="title" />

        <Label>Price</Label>
        <Input type="number" id="price" />

        <Label>Count</Label>
        <Input type="number" id="count" />

        <Label>Description</Label>
        <Textarea type="text" id="description" rows={10} />

        <Button>Create</Button>
      </Group>
    </Fragment>
  );
}
export default AccountListItem;
