import React, { Fragment } from "react";
import Title from "../components/Title";
import { Group, Label, Input, Textarea, Button } from "../components/Controls";

function AccountListItem() {
  return (
    <Fragment>
      <Title name="Account - list item" />
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
