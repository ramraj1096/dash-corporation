import React, { useState } from "react";
import PokemonComparison from "./PokemonComparison";

const ComparisonSelector = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  // Function to handle comparison logic when user clicks Compare button
  const handleCompare = () => {
    // Prompt user to input two Pokémon IDs
    const id1 = prompt("Enter the ID of the first Pokémon:");
    const id2 = prompt("Enter the ID of the second Pokémon:");

    if (id1 && id2) {
      // Fetch Pokémon data for the entered IDs (you can replace this with an API call)
      fetchPokemonData(id1, id2);
    } else {
      alert("Please enter valid Pokémon IDs.");
    }
  };

  // Function to fetch Pokémon data (replace with actual API call if needed)
  const fetchPokemonData = async (id1, id2) => {
    try {
      // Example API calls, you can adjust to your data source or API
      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id1}`);
      const data1 = await response1.json();

      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id2}`);
      const data2 = await response2.json();

      // Set the fetched data to state
      setPokemon1(data1);
      setPokemon2(data2);
    } catch (error) {
      alert("Error fetching Pokémon data.");
    }
  };

  return (
    <div>
      {/* Compare Button */}
      <button
        onClick={handleCompare}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Compare Pokémon
      </button>

      {/* Show Pokémon comparison if data is available */}
      {pokemon1 && pokemon2 && (
        <PokemonComparison pokemon1={pokemon1} pokemon2={pokemon2} />
      )}
    </div>
  );
};

export default ComparisonSelector;
