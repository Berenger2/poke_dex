import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import PokemonFilter from "./PokemonFilter";

const PokemonList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
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

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && nextUrl) {
      nextPage();
    }
  };

  useEffect(() => {
    const currentLoader = loader.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  const nextPage = async () => {
    try {
      const response = await axios.get(nextUrl);
      const data = response.data;
      setNextUrl(data.next);

      const newPokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return response.data;
        })
      );

      setPokemonList((prevList) => [...prevList, ...newPokemonData]);
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
      const updatedPokemonList = [
        ...storedPokemonList,
        { name: pokemon.name, id: pokemon.id },
      ];
      localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
      alert("Le pokemon a été ajouté avec succès!");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList
  .filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  })
  .reduce((unique, pokemon) => {
    return unique.some((p) => p.name === pokemon.name) ? unique : [...unique, pokemon];
  }, []);

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
          <div ref={loader} style={{ margin: "20px", textAlign: "center" }}>
            {loading && <p>Loading...</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;