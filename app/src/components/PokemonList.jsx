import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import PokemonFilter from "./PokemonFilter";

const PokemonList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [previousUrl, setPreviousUrl] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=20&limit=30"
        );
        const data = response.data;
        setNextUrl(data.next);
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const pokemonData = response.data;
            return pokemonData;
          })
        );
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextPage = async () => {
    let res = await fetch(nextUrl);
    let data = await res.json();

    setNextUrl(data.next);
    setPreviousUrl(data.previous);

    const newPokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        return pokemonData;
      })
    );

    setPokemonList(newPokemonList);
  };

  const previousPage = async () => {
    if (!previousUrl) return;

    try {
      const res = await axios.get(previousUrl);
      const data = res.data;

      setNextUrl(data.next);
      setPreviousUrl(data.previous);

      const newPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const pokemonData = response.data;
          return pokemonData;
        })
      );

      setPokemonList(newPokemonList);
    } catch (error) {
      setError(error.message);
    }
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
      const updatedPokemonList = [...storedPokemonList, { name: pokemon.name, id: pokemon.id }];
      localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
      alert("Le pokemon a été ajouté avec succès!");
    }
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
    </div>
  );
};

export default PokemonList;
