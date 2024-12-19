import React from "react";

import { useFavorites } from "../../hooks/useFavorites";

import { BookList } from "../../components/BookList";

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
