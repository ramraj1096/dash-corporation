import React, { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import { motion } from "framer-motion";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([
    "All",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Bug",
    "Normal",
    "Fairy",
    "Dragon",
    "Ghost",
    "Psychic",
    "Fighting",
    "Poison",
    "Ground",
    "Rock",
    "Ice",
    "Dark",
    "Steel",
    "Flying",
  ]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const results = await getPokemons();
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const data = await getPokemonDetails(pokemon.url);
            return data;
          })
        );
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(term);
      const matchesType = selectedType
        ? pokemon.types.some(
            (type) => type.type.name === selectedType.toLowerCase()
          )
        : true;

      return matchesSearch && matchesType;
    });

    setFilteredPokemons(filtered);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);

    const filtered = pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
      const matchesType =
        type !== "All"
          ? pokemon.types.some(
              (typeObj) => typeObj.type.name === type.toLowerCase()
            )
          : true;

      return matchesSearch && matchesType;
    });

    setFilteredPokemons(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setFilteredPokemons(pokemons);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] px-4">
        <h2 className="text-2xl font-semibold animate-pulse text-center">
          Loading Pokémons...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] px-4">
        <h2 className="text-2xl font-semibold text-red-600 text-center">
          Failed to load Pokémons.
        </h2>
      </div>
    );
  }

  if (filteredPokemons.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh] px-4 flex-col">
        <h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
          No Pokémon match your criteria.
        </h2>
        <button
          onClick={resetFilters}
          className="text-lg text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center text-indigo-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pokémon Explorer
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Pokémon"
          className="px-6 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select
          className="px-6 py-3 border rounded-full shadow-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-all ease-in-out duration-300 w-full sm:w-64"
          value={selectedType}
          onChange={handleTypeChange}
        >
          {types.map((type) => (
            <option key={type} value={type} className="font-medium">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} className="cursor-pointer">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
