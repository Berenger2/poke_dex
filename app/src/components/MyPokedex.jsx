import React from "react";
import PokemonFilter from "./PokemonFilter";
import PokemonCard from "./PokemonCard";
import axios from "axios";


function MyPokedex() {
  const [filteredPokemonList, setFilteredPokemonList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [updateList, setUpdateList] = React.useState(false);

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
    setUpdateList(prevState => !prevState); 
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
  
    filteredList.forEach((pokemon) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
            .then((response) => {
                const updatedPokemon = { ...pokemon, ...response.data };
                setFilteredPokemonList((prevList) =>
                    prevList.map((p) => (p.id === updatedPokemon.id ? updatedPokemon : p))
                );
            })
            .catch((error) => {
                console.log("Error fetching data for pokemon:", pokemon.name);
            });
    });
  }, [searchTerm, updateList]); 


    const handleShowDetails = (data) => {
        // Logic to handle showing details of the selected pokemon
        console.log(data);
    };

return (
    <div>
        <h2>Mon Pokedex</h2>
        <PokemonFilter searchTerm={searchTerm} handleSearch={handleSearch} />

        {filteredPokemonList.map((data) => (
            <div key={data.name}>
                <PokemonCard key={data.name} pokemon={data} />
                <button onClick={() => handleRemovePokemon(data)}>Retirer</button>
                <button onClick={() => handleShowDetails(data)}>Détails</button>
            </div>
        ))}
        <button onClick={handleRemoveAllPokemon}>Vider Mon pokemon dex</button>
    </div>
);
}

export default MyPokedex;
