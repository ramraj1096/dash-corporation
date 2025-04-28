import React from "react";
import { motion } from "framer-motion";

const PokemonCard = ({ pokemon }) => {
  return (
    <motion.div
      className="border border-gray-300 rounded-xl p-4 text-center bg-gray-100 hover:shadow-lg hover:scale-105 transition-all"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto"
      />
      <h3 className="capitalize text-lg font-semibold mt-2">{pokemon.name}</h3>
      <p className="text-gray-500 text-sm">ID: {pokemon.id}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs"
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default PokemonCard;
