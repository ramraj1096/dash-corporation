import React from "react";

const PokemonComparison = ({ pokemon1, pokemon2 }) => {
  const stats = ["HP", "Attack", "Defense", "Speed"];
  const getStatValue = (pokemon, statName) => {
    switch (statName) {
      case "HP":
        return pokemon.stats[0].base_stat;
      case "Attack":
        return pokemon.stats[1].base_stat;
      case "Defense":
        return pokemon.stats[2].base_stat;
      case "Speed":
        return pokemon.stats[5].base_stat;
      default:
        return 0;
    }
  };

  return (
    <div className="flex justify-center gap-10 flex-wrap mt-8">
      {[pokemon1, pokemon2].map((pokemon, index) => (
        <div
          key={pokemon.name}
          className="bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center transition hover:shadow-lg"
        >
          <h3 className="text-2xl font-bold capitalize text-blue-600 mb-3">
            {pokemon.name}
          </h3>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-28 h-28 mb-4"
          />
          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-700 mb-2 text-center">
              Stats
            </h4>
            <ul className="space-y-1 text-gray-600">
              {stats.map((stat) => (
                <li key={stat} className="flex justify-between px-2">
                  <span>{stat}</span>
                  <span className="font-medium">
                    {getStatValue(pokemon, stat)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonComparison;
