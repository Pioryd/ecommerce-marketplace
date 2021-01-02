import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useQuery from "../../hooks/useQuery";

export default function usePaginationAndSortSearch(props) {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const update = (data) => {
    if (data.sort != null) setSort(data.sort);
    if (data.page != null) setPage(data.page);
    if (data.searchText != null) setSearchText(data.searchText);
  };

  useEffect(
    () => history.push(`${location.pathname}?sort=${sort}&page=${page}`),
    [history, page, sort]
  );

  useEffect(() => {
    setPage(query.get("page") || 1);
    setSort(query.get("sort") || "dateAsc");
  }, [query]);

  return { sort, page, searchText, update };
}
