"use client";
import { useEffect, useState } from "react";

export const getPokemons = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=5000`);

  const { count, next, previous, results } = await res.json();

  return { count, next, previous, results };
};

const promise = getPokemons();

export default function Pokemons(props) {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    promise.then(setData);
  }, []);

  const { count = 0, next, previous, results = [] } = data;

  const filteredResults =
    searchQuery != ""
      ? results.filter((item) => item.name.includes(searchQuery))
      : results;

  const pokemons = filteredResults.slice((page - 1) * 20, page * 20);

  const totalPage = Math.ceil(filteredResults.length / 20);

  return (
    <div>
      <h1>Pokemons</h1>

      <input
        type="search"
        name=""
        id=""
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {pokemons.map((pokemon) => (
        <h4 key={pokemon.name}>{pokemon.name}</h4>
      ))}

      {Array(totalPage)
        .fill(null)
        .map((value, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
    </div>
  );
}
