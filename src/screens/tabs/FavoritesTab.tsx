import React from "react";

import { BookList } from "~/components";
import { useFavorites } from "~/hooks";

const FavoritesTab = () => {
  const { favorites } = useFavorites();
  return (
    <BookList
      data={favorites}
      searchMapper={(b) => `${b.title} ${b.description}`}
    />
  );
};

export default FavoritesTab;
