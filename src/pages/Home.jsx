import React, { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("id");

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const handleButtonClick = () => {
    setIsPopUpVisible(true); // Show the pop-up when button is clicked
  };

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
      const matchesType =
        selectedType !== "All"
          ? pokemon.types.some(
              (typeObj) => typeObj.type.name === selectedType.toLowerCase()
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

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setFilteredPokemons(pokemons);
  };

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortPokemons = (pokemons) => {
    if (sortOrder === "name") {
      return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "alphabetical") {
      return pokemons.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else {
      return pokemons.sort((a, b) => a.id - b.id);
    }
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

      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/favorites")}
          className="cursor-pointer hover:bg-gray-200 p-2 text-blue-500 hover:underline mb-4"
        >
          Go to Favorites →
        </button>
        <button
          onClick={() => navigate("/compare")}
          className="cursor-pointer hover:bg-gray-200 p-2 text-blue-500 hover:underline mb-4"
        >
          Compare →
        </button>

        {isPopUpVisible && <PopUp />}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <motion.input
          type="text"
          placeholder="Search Pokémon"
          className="px-6 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          value={searchTerm}
          onChange={handleSearch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.select
          className="px-6 py-3 border rounded-full shadow-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-all ease-in-out duration-300 w-full sm:w-64"
          value={selectedType}
          onChange={handleTypeChange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {types.map((type) => (
            <option key={type} value={type} className="font-medium">
              {type}
            </option>
          ))}
        </motion.select>

        <motion.select
          className="px-6 py-3 border rounded-full shadow-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-all ease-in-out duration-300 w-full sm:w-64"
          value={sortOrder}
          onChange={handleSortChange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="alphabetical">Sort Alphabetically</option>
        </motion.select>

        <motion.select
          className="px-6 py-3 border rounded-full shadow-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-all ease-in-out duration-300 w-full sm:w-64"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <option value={10}>10 Items per Page</option>
          <option value={20}>20 Items per Page</option>
          <option value={50}>50 Items per Page</option>
        </motion.select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortPokemons(paginatedPokemons).map((pokemon) => (
          <div key={pokemon.id} className="cursor-pointer">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border rounded-full text-sm mr-4"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Previous
        </motion.button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <motion.button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 border rounded-full text-sm ml-4"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
