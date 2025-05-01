import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [status, setStatus] = useState(200);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setStatus(res.status);
        const data = await res.json();

        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        setEvolution(evoData);
      } catch (err) {
        console.error("Error fetching Pokémon details", err);
      }
    };

    fetchDetails();
  }, [name]);

  if (status === 404) {
    toast.error("No data Available");
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <p className="text-2xl font-medium text-gray-700 mb-4">
          No Pokémon data.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 text-white bg-blue-500 cursor-pointer rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          ← Go Back Home
        </button>
      </div>
    );
  }

  // Ensure pokemon exists before trying to render its properties
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const renderStats = () =>
    pokemon.stats.map((stat) => (
      <div key={stat.stat.name} className="flex justify-between py-1">
        <span className="capitalize">{stat.stat.name}</span>
        <span className="font-semibold">{stat.base_stat}</span>
      </div>
    ));

  const renderAbilities = () =>
    pokemon.abilities.map((ab) => (
      <span
        key={ab.ability.name}
        className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs mr-2"
      >
        {ab.ability.name}
      </span>
    ));

  const renderMoves = () =>
    pokemon.moves.slice(0, 10).map((move) => (
      <li key={move.move.name} className="capitalize">
        {move.move.name}
      </li>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-2xl rounded-xl"
    >
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer text-blue-500 hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={pokemon.sprites?.other["official-artwork"]?.front_default}
          alt={pokemon.name}
          className="w-48 h-48"
        />
        <div>
          <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
          <p className="text-gray-500">ID: {pokemon.id}</p>

          <div className="mt-3 flex gap-2 flex-wrap">
            {pokemon.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Stats</h3>
      <div className="grid grid-cols-2 gap-2">{renderStats()}</div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Abilities</h3>
      <div>{renderAbilities()}</div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Moves (Top 10)</h3>
      <ul className="list-disc list-inside">{renderMoves()}</ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Evolution Chain</h3>
      <p className="text-gray-600">Coming soon...</p>
    </motion.div>
  );
};

export default PokemonDetail;
