import React from "react";

import { useQuery } from "@tanstack/react-query";

import { BookList } from "~/components";
import { HARRY_POTTER_BOOKS_API } from "~/utils/constants";
import { Book } from "~/utils/types";
import { fetchJsonData } from "~/utils/network";

const getHarryPotterBooks = async (): Promise<Book[]> => {
  return await fetchJsonData(HARRY_POTTER_BOOKS_API);
};

function HomeTab() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [HARRY_POTTER_BOOKS_API],
    queryFn: getHarryPotterBooks,
  });

  return (
    <BookList
      data={data}
      isLoading={isLoading}
      isError={isError}
      searchMapper={(b) => b.title}
    />
  );
}

export default HomeTab;
