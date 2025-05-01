import React, { useState } from "react";
import { motion } from "framer-motion";
import PokemonComparison from "../components/PokemonComparison";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ComparePage = ({ onCompare }) => {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id1 || !id2) {
      toast.info("Both IDs required");
      return;
    }

    setLoading(true);
    try {
      const [data1, data2] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id1}`).then((res) =>
          res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon/${id2}`).then((res) =>
          res.json()
        ),
      ]);
      setPokemonData({ pokemon1: data1, pokemon2: data2 });
      onCompare?.(id1, id2); // optional chaining
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">
        Compare Pokémon
      </h2>

      <button
        onClick={() => navigate("/")}
        className="cursor-pointer hover:bg-gray-200 p-2 text-blue-500 hover:underline mb-4"
      >
        Home →
      </button>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pokémon ID 1
          </label>
          <input
            type="text"
            value={id1}
            onChange={(e) => setId1(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., pikachu or 25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pokémon ID 2
          </label>
          <input
            type="text"
            value={id2}
            onChange={(e) => setId2(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g., bulbasaur or 1"
          />
        </div>

        <div className="md:col-span-2 flex justify-center gap-4 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>
      </form>

      {pokemonData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PokemonComparison
            pokemon1={pokemonData.pokemon1}
            pokemon2={pokemonData.pokemon2}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ComparePage;
