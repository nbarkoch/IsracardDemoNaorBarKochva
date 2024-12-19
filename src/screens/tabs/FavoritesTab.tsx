import React from "react";

import { useFavorites } from "../../hooks/useFavorites";

import { BookList } from "../../components/BookList";

const FavoritesTab = () => {
  const { favorites: data, isLoading } = useFavorites();

  return (
    <BookList
      data={data}
      isLoading={isLoading}
      searchMapper={(b) => `${b.title} ${b.description}`}
    />
  );
};

export default FavoritesTab;
