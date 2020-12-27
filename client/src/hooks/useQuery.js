import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
  const location = useLocation();
  const [urlSearchParams] = useState(new URLSearchParams(location.search));

  return urlSearchParams;
}
