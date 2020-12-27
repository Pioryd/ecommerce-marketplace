import React from "react";

import { Group, Label } from "../components/Layout/Controls";

function NotFound(props) {
  return (
    <Group>
      <Label style={{ textAlign: "center" }}>Not found (404)</Label>
    </Group>
  );
}

export default NotFound;
