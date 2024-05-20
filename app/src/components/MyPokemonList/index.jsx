import React, { useState, useEffect } from "react";
import { Pokeball } from "../Spinner";
import PokemonCard from "../PokemonCard";
import Search from "../Search";
import axios from "axios";

import { App } from "./styles";
import Button from "react-bootstrap/esm/Button";

const MyPokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  const [filteredPokemonList, setFilteredPokemonList] = React.useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updateList, setUpdateList] = React.useState(false);

  // const [totalPokemon] = useState(807);
  const [pokemonPerPage] = useState(54);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchPokemons();
    const pokemonList = JSON.parse(localStorage.getItem("pokemonList")) || [];
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemonList(filteredList);

    filteredList.forEach((pokemon) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
        .then((response) => {
          const updatedPokemon = { ...pokemon, ...response.data };
          setFilteredPokemonList((prevList) =>
            prevList.map((p) =>
              p.id === updatedPokemon.id ? updatedPokemon : p
            )
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching data for pokemon:", pokemon.name);
        });
    });
    return cleanApp;
  }, [query, updateList, currentPage]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleRemovePokemon = (pokemon) => {
    const storedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];
    const updatedPokemonList = storedPokemonList.filter(
      (p) => p.name !== pokemon.name
    );
    localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
    setFilteredPokemonList(updatedPokemonList);
    setUpdateList((prevState) => !prevState);
  };

  const handleRemoveAllPokemon = () => {
    localStorage.removeItem("pokemonList");
    setFilteredPokemonList([]);
  };

  const cleanApp = () => {
    setPokemons([]);
    setIsLoading(true);
  };

  return isLoading ? (
    <Pokeball />
  ) : (
    <>
      <Search searchTerm={query} handleSearch={handleSearch} />

      <App>
        {filteredPokemonList.map((pokemon) => (
          <div className="card" key={pokemon.name}>
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          </div>
        ))}
      </App>
      <div className="d-flex justify-content-center mt-4" >
        <Button variant="warning" size="lg" onClick={handleRemoveAllPokemon}>
        Vider Mon pokemondex
        </Button>
    </div>
    </>
  );
};

export default MyPokemonList;
