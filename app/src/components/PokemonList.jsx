import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import PokemonFilter from "./PokemonFilter";
import MyPokedex from "./MyPokedex";

const PokemonList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [previousUrl, setPreviousUrl] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=30")
      .then((response) => response.json())
      .then(async (data) => {
        setNextUrl(data.next);
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();
            return pokemonData;
          })
        );
        setPokemonList(pokemonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const nextPage = async () => {
    let res = await fetch(nextUrl);
    let data = await res.json();

    setNextUrl(data.next);
    setPreviousUrl(data.previous);

    data.results.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();
      setPokemonList((prevList) => [...prevList, pokemonData]);
    });
  };

  const previousPage = async () => {
    if (!previousUrl) return;

    let res = await fetch(previousUrl);
    let data = await res.json();

    setNextUrl(data.next);
    setPreviousUrl(data.previous);

    data.results.forEach(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();
      setPokemonList((prevList) => [...prevList, pokemonData]);
    });
  };

  const handleSelectPokemon = (pokemon) => {
    const storedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];
    const isPokemonAlreadyAdded = storedPokemonList.some(
      (p) => p.name === pokemon.name
    );
    if (isPokemonAlreadyAdded) {
      alert("Le pokemon existe déjà!");
    } else {
      const updatedPokemonList = [...storedPokemonList, pokemon];
      localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
      alert("Le pokemon a été ajouté avec succès!");
    }
  };

  const handleRemovePokemon = (pokemon) => {
    const storedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];
    const updatedPokemonList = storedPokemonList.filter(
      (p) => p.name !== pokemon.name
    );
    localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
  };

  const handleRemoveAllPokemon = () => {
    localStorage.removeItem("pokemonList");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <PokemonFilter searchTerm={searchTerm} handleSearch={handleSearch} />

          {filteredPokemonList.map((pokemon) => (
            <div key={pokemon.name}>
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
              <button onClick={() => handleSelectPokemon(pokemon)}>
                Ajouter
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={previousPage}>Page Precedente</button>
      <button onClick={nextPage}>Page suivante</button>
       <MyPokedex />
    </div>
  );
};

export default PokemonList;
