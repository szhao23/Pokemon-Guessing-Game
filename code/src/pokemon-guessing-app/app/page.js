"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
