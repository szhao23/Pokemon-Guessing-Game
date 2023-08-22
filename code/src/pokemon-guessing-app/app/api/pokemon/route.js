import axios from "axios";
import { NextResponse } from "next/server";

// Fetch function to pull 100 random Pokemon
const getRandomPokemon = async () => {
  try {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    return data;
  } catch (error) {
    return error;
  }
};

export async function GET() {
  try {
    const pokemon = await getRandomPokemon();
    return NextResponse.json(pokemon.data);
  } catch (error) {
    return NextResponse.json(500, error);
  }
}
