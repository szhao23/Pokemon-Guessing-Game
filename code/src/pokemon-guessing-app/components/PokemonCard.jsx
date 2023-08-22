"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Fetch information from PokeAPI so we can use to render
// Pass "pokemon" and "isCorrect" props so we can use to render
export default function PokemonCard({ pokemon, isCorrect }) {
  // useState for Fetched Data
  const [data, setData] = useState({});

  // Run useEffect when Pokemon Changes from Props
  useEffect(() => {
    try {
      console.log("Pokemon: ", pokemon);
      const fetchData = async () => {
        const result = await axios.get(pokemon?.url);
        setData(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pokemon]);

  return (
    // Render PokemonCard
    <div className="card">
      <img
        src={data?.sprites?.front_default}
        alt={pokemon?.name}
        className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
        style={{
          marginTop: "50px",
        }}
      />
    </div>
  );
}
