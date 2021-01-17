import React, { useEffect, useState } from "react";
import { Group, Button, ButtonDisabled } from "../Layout/Controls";

const MIN_PAGE = 1;

export default function Pagination({ update, currentPage, totalPages }) {
  const [pagePrev, setPagePrev] = useState(MIN_PAGE);
  const [pageNext, setPageNext] = useState(MIN_PAGE);

  useEffect(() => {
    setPagePrev(Math.max(1, Number(currentPage) - 1));
    setPageNext(Math.min(totalPages, Number(currentPage) + 1));
  }, [currentPage, totalPages]);

  return (
    <Group style={{ display: "flex" }}>
      <Button id="pagePrevButton" onClick={() => update({ page: pagePrev })}>
        prev
      </Button>
      <Button id="pageMinButton" onClick={() => update({ page: MIN_PAGE })}>
        {MIN_PAGE}
      </Button>
      <ButtonDisabled style={{ fontWeight: "bold" }}>
        {currentPage}
      </ButtonDisabled>
      <Button id="pageMaxButton" onClick={() => update({ page: totalPages })}>
        {totalPages}
      </Button>
      <Button id="pageNextButton" onClick={() => update({ page: pageNext })}>
        next
      </Button>
    </Group>
  );
}
