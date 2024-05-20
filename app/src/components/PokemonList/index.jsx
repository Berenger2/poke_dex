import React, { useState, useEffect } from "react";
import { Pokeball } from "../Spinner";
import PokemonCard from "../PokemonCard";
import Search from "../Search";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { App } from "./styles";
import NavBar from "../NavBar";

const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  
  // bon
  const [totalPokemon] = useState(807);
  const [pokemonPerPage] = useState(54);

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

  
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredPokemonList = pokemons
  .filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(query.toLowerCase());
  })
  .reduce((unique, pokemon) => {
    return unique.some((p) => p.name === pokemon.name)
      ? unique
      : [...unique, pokemon];
  }, []);

  return isLoading ? (
    <Pokeball />
  ) : (
    <>
     <NavBar />
      
      <Search searchTerm={query} handleSearch={handleSearch}/>
      <div>
      <InfiniteScroll
          dataLength={pokemons.length}
          next={() => setCurrentPage(currentPage + 1)}
          hasMore={pokemons.length < totalPokemon}
          loader={<h4>Loading...</h4>}
        >
            <App>
            {filteredPokemonList.map((pokemon) => (
            <div className="card" key={pokemon.name}>
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            </div>
          ))}
           
            </App>
        </InfiniteScroll>
      </div>
       
      
    </>
  );
};

export default PokemonList;