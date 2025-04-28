import axios from "axios";

// Fetch first 150 Pokémons
export const getPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=150"
    );
    return response.data.results; // returns array of { name, url }
  } catch (error) {
    console.error("Error fetching Pokémons:", error);
    throw error;
  }
};

// Fetch detailed info for a single Pokemon by URL
export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};
