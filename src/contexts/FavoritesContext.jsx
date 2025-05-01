import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites"));
    if (stored && Array.isArray(stored)) {
      // Fetch full Pokémon data for each name
      Promise.all(
        stored.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json()
          )
        )
      ).then(setFavorites);
    }
  }, []);

  // Save only names to localStorage
  useEffect(() => {
    const namesOnly = favorites.map((p) => p.name);
    localStorage.setItem("favorites", JSON.stringify(namesOnly));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFavorite = (name) => {
    setFavorites(favorites.filter((p) => p.name !== name));
  };

  const isFavorite = (name) => {
    return favorites.some((p) => p.name === name);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
