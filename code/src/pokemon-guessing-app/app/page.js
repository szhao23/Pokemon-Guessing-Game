"use client";
import Image from "next/image";
import { useState } from "react";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
