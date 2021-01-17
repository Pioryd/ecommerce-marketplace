import "regenerator-runtime/runtime";
import React from "react";
import { render } from "@testing-library/react";

import Title from "./index.js";

test("Component - Title", async () => {
  const text = "some-text";
  const { getByText } = render(<Title name={text} />);
  expect(getByText(text)).toBeInTheDocument();
});
