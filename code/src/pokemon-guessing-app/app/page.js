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

  // HandleSubmit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    // If No Guess Return Nothing End Function
    if (!guess) return;
    if (guess.toLowerCase() === currentPokemon.name) {
      setScore(score + 1);
      setGuess("");
      setIsCorrect(true);

      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();
      }, 2000);
    } else {
      setGuess("");
    }
  };

  // When the Pokemon Array is Updated, this useEffect will run, checks if pokemon exists, is not error, and is not loading, if all is true
  // Will Select a Random Pokemon using Math.floor formula and set the selected Pokemon as the CurrentPokemon
  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon]);

  if (loading) {
    const statusMessage = loading ? "Loading..." : "Error!";
    return (
      <main className="flex flex-col items-center justify-center min-h-screen py-2 h-screen">
        <h1 className="text-6xl font-bold">{statusMessage}</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Error Message comes up if something goes wrong for the user to see */}
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}

      <h1 className="text-4x1 font-bold">Who's that Pokemon?!</h1>
      <h2 className="text-3x1 font-bold">Score: {score}</h2>

      <PokemonCard pokemon={currentPokemon} isCorect={isCorrect} />

      <form
        className="w-full max-w-sm"
        onSubmit={handleSubmit}
        style={{ marginTop: "2rem" }}
      >
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Which Pokemon is this?"
            aria-label="Full name"
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => {
              // Set Guess to Empty String
              setGuess("");
              // Call another Pokemon
              getPokemon();
            }}
          >
            Skip
          </button>
        </div>
      </form>
    </main>
  );
}
