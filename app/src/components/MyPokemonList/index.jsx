import React, { useState, useEffect } from "react";
import { Pokeball } from "../Spinner";
import PokemonCard from "../PokemonCard";
import Search from "../Search";
import axios from "axios";

import { App } from "./styles";

const MyPokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [totalPokemon] = useState(807);
  const [pokemonPerPage] = useState(54);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPokemons();

    return cleanApp;
  }, [currentPage]);

  const fetchPokemons = async () => {
    try {
      const pokemonList = JSON.parse(localStorage.getItem("pokemonList")) || [];
      const filteredList = pokemonList.slice(
        (currentPage - 1) * pokemonPerPage,
        currentPage * pokemonPerPage
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...filteredList]);
 
      filteredList.forEach((pokemon) => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
          .then((response) => {
            const updatedPokemon = { ...pokemon, ...response.data };
            setPokemons((prevPokemons) =>
              prevPokemons.map((p) =>
                p.id === updatedPokemon.id ? updatedPokemon : p
              )
            );
          })
          .catch((error) => {
            console.error("Error fetching data for pokemon:", pokemon.name);
          });
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cleanApp = () => {
    setPokemons([]);
    setIsLoading(true);
  };

  const renderPokemonsList = () => {
    return pokemons
      .filter((pokemon) => pokemon.name.includes(query))
      .map((pokemon) => {
        console.log(pokemon);
        return (
          <React.Fragment key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </React.Fragment>
        );
      });
  };

  return isLoading ? (
    <Pokeball />
  ) : (
    <>

      <Search getQuery={(q) => setQuery(q)} />
     
      <App>{renderPokemonsList()}</App>

    </>
  );
};

export default MyPokemonList;
