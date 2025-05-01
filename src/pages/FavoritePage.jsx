import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <p className="text-2xl font-medium text-gray-700 mb-4">
          No favorite Pokémon yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 text-white cursor-pointer bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          ← Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Pokémon</h1>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer text-blue-500 hover:underline mb-4"
      >
        ← Back
      </button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
