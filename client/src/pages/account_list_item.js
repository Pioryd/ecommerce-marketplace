import React from "react";
import Title from "../components/title";
import { Group, Label, Input, Textarea, Button } from "../components/controls";

function AccountListItem() {
  return (
    <React.Fragment>
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

        <Label>Image</Label>
        <Input type="file" id="title" />

        <Button className="a4t_button" type="submit">
          Create
        </Button>
      </Group>
    </React.Fragment>
  );
}
export default AccountListItem;
