import React from "react";
import PokemonFilter from "./PokemonFilter";
import PokemonCard from "./PokemonCard";

function MyPokedex() {
  const [filteredPokemonList, setFilteredPokemonList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemovePokemon = (pokemon) => {
    const storedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];
    const updatedPokemonList = storedPokemonList.filter(
      (p) => p.name !== pokemon.name
    );
    localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
    setFilteredPokemonList(updatedPokemonList);
  };

const handleRemoveAllPokemon = () => {
    localStorage.removeItem("pokemonList");
    setFilteredPokemonList([]);
};

  React.useEffect(() => {
    const pokemonList = JSON.parse(localStorage.getItem("pokemonList")) || [];
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  }, [searchTerm]);

  return (
    <div>
      <h2>Mon Pokedex</h2>
      <PokemonFilter searchTerm={searchTerm} handleSearch={handleSearch} />

      {filteredPokemonList.map((pokemon) => (
        <div key={pokemon.name}>
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
          <button onClick={() => handleRemovePokemon(pokemon)}>Retirer</button>
        </div>
      ))}
      <button onClick={handleRemoveAllPokemon}>Vider Mon pokemon dex</button>
    </div>
  );
}

export default MyPokedex;
