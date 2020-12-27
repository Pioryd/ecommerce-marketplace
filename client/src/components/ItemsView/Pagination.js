import React, { useEffect, useState } from "react";
import { Group, ButtonLink, ButtonDisabled } from "../Layout/Controls";

const MIN_PAGE_NUMER = 1;

function Pagination({ route, currentPage = MIN_PAGE_NUMER, totalPages }) {
  const [routeMin, setRouteMin] = useState(route);
  const [routeMax, setRouteMax] = useState(route);
  const [routePrev, setRoutePrev] = useState(route);
  const [routeNext, setRouteNext] = useState(route);

  useEffect(() => {
    setRouteMin(route + "/" + MIN_PAGE_NUMER);
    setRouteMax(route + "/" + totalPages);
    setRoutePrev(route + "/" + Math.max(1, Number(currentPage) - 1));
    setRouteNext(route + "/" + Math.min(totalPages, Number(currentPage) + 1));
  }, [route, currentPage, totalPages]);

  return (
    <Group style={{ display: "flex" }}>
      <ButtonLink to={routePrev}>prev</ButtonLink>
      <ButtonLink to={routeMin}>{MIN_PAGE_NUMER}</ButtonLink>
      <ButtonDisabled style={{ fontWeight: "bold" }}>
        {currentPage}
      </ButtonDisabled>
      <ButtonLink to={routeMax}>{totalPages}</ButtonLink>
      <ButtonLink to={routeNext}>next</ButtonLink>
    </Group>
  );
}

export default Pagination;
