import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext.jsx";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(pokemon.name);
  const navigate = useNavigate();

  // Memoize toggleFavorite function
  const toggleFavorite = useCallback(
    (e) => {
      e.stopPropagation(); // prevent triggering card click
      fav ? removeFavorite(pokemon.name) : addFavorite(pokemon);
    },
    [fav, pokemon.name, addFavorite, removeFavorite]
  );

  // Memoize handleCardClick function
  const handleCardClick = useCallback(() => {
    navigate(`/pokemon/${pokemon.name}`);
  }, [navigate, pokemon.name]);

  return (
    <motion.div
      className="border border-gray-200 rounded-2xl p-5 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative cursor-pointer mb-4"
      whileHover={{ scale: 1.03 }}
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 cursor-pointer right-3 text-xl text-red-500 hover:scale-110 transition-transform z-10"
        title="Toggle Favorite"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <div onClick={handleCardClick}>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 mx-auto"
        />
        <h3 className="capitalize text-xl font-bold mt-3 text-gray-800">
          {pokemon.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">ID: {pokemon.id}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/pokemon/${pokemon.name}`);
        }}
        className="mt-4 w-full cursor-pointer py-2 text-blue-600 font-semibold hover:bg-blue-50 hover:underline rounded-md transition-colors"
      >
        View Details →
      </button>
    </motion.div>
  );
};

export default PokemonCard;
