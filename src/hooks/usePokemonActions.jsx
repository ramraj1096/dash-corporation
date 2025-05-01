import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const usePokemonActions = (pokemon) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const fav = isFavorite(pokemon.name);

  const toggleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      fav ? removeFavorite(pokemon.name) : addFavorite(pokemon);
    },
    [fav, pokemon.name, addFavorite, removeFavorite]
  );

  const goToDetail = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/pokemon/${pokemon.name}`);
    },
    [navigate, pokemon.name]
  );

  return { fav, toggleFavorite, goToDetail };
};
