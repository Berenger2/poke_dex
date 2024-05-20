import React, { useState, useEffect } from "react";
import { Pokeball } from "../Spinner";
import PokemonCard from "../PokemonCard";
import Search from "../Search";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { App } from "./styles";
import NavBar from "../NavBar";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPokemon] = useState(807);
  const [pokemonPerPage] = useState(54);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${(currentPage - 1) * pokemonPerPage}`);
      setPokemons(prevPokemons => [...prevPokemons, ...response.data.results]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPokemonsList = () => {
    return pokemons
      .filter(pokemon => pokemon.name.includes(query))
      .map(pokemon => 
    
      <PokemonCard key={pokemon.name} pokemon={pokemon} />);
  };

  return isLoading ? (
    <Pokeball />
  ) : (
    <>
     <NavBar />
      
      <Search getQuery={(q) => setQuery(q)} />
      
        <InfiniteScroll
          dataLength={pokemons.length}
          next={() => setCurrentPage(currentPage + 1)}
          hasMore={pokemons.length < totalPokemon}
          loader={<h4>Loading...</h4>}
        >
            <App>
            <PokemonCard key={pokemon.name} pokemon={pokemon}/>

          {/* {renderPokemonsList()} */}
            </App>
        </InfiniteScroll>
      
    </>
  );
};

export default PokemonList;