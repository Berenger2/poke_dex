import './App.css';
import React, { useEffect, useState } from 'react';
import PokemonList from './components/PokemonList';

function App() {
  // const [pokemonList, setPokemonList] = useState([]);
  

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=30')
  //     .then(response => response.json())
  //     .then(data => setPokemonList(data.results))
  //     .catch(error => console.log(error));
  // }, []);

  // const handleSelectPokemon = (pokemon) => {
  //   const storedPokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
  //   const isPokemonAlreadyAdded = storedPokemonList.some((p) => p.name === pokemon.name);
  //   if (!isPokemonAlreadyAdded) {
  //     const updatedPokemonList = [...storedPokemonList, pokemon];
  //     localStorage.setItem('pokemonList', JSON.stringify(updatedPokemonList));
  //   }
  // }


 
  // const handleRemoveAllPokemon = () => {
  //   localStorage.removeItem('pokemonList');
  // };

  return (
    <div className="App">
      <PokemonList />
      {/* <div>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name}>
            {pokemon.name}
            <button onClick={() => handleSelectPokemon(pokemon)}>Ajouter</button>
          </div>
        ))}
      </div> */}

      {/* <div>
        <h2>Mon Pokedex</h2>
        <ul>
          {JSON.parse(localStorage.getItem('pokemonList'))?.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name}
              <button onClick={() => handleRemovePokemon(pokemon)}>Retirer</button>
            </li>
          ))}
        </ul>
      </div> */}
      {/* <button onClick={handleRemoveAllPokemon}>Vider mon Pokedex</button> */}

    
    
    </div>
  );
 
};



export default App;
