"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  // useState for Pokemon
  const [pokemon, setPokemon] = useState(null);
  // useState for Pokemon User has to Guess
  const [currentPokemon, setCurrentPokemon] = useState(null);
  // useState for Pokemon Loading when Fetching
  const [loading, setLoading] = useState(false);
  // useState for Errors
  const [isError, setIsError] = useState(false);
  // useState for Pokemon Guess Score
  const [score, setScore] = useState(0);
  // useState for User's Guess to compare to Correct Guess
  const [guess, setGuess] = useState("");
  // useState for Correct or Incorrect to show the Shadow Version of Pokemon or Actual Version
  const [isCorrect, setIsCorrect] = useState(false);

  // Call Backend Route to Fetch All Pokemon
  const getPokemon = async () => {
    setLoading(true);

    try {
      const data = await axios.get("/api/pokemon");
      console.log("Data is: ", data);
      setPokemon(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setLoading(false);
    }
  };

  // Run getPokemon function when page loads
  useEffect(() => {
    getPokemon();
  }, []);

  // When the Pokemon Array is Updated, this useEffect will run, checks if pokemon exists, is not error, and is not loading, if all is true
  // Will Select a Random Pokemon using Math.floor formula and set the selected Pokemon as the CurrentPokemon
  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4x1 font-bold">Who's that Pokemon?!</h1>
      <h2 className="text-3x1 font-bold">Score: {score}</h2>

      <PokemonCard pokemon={currentPokemon} isCorect={isCorrect} />
    </main>
  );
}
