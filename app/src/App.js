import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=30')
      .then(response => response.json())
      .then(data => setPokemonList(data.results))
      .catch(error => console.log(error));
  }, []);

 
 

  return (
    <div className="App">
      <div>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name}>
            {pokemon.name}
          
          </div>
        ))}
      </div>

      <br />
      
    
    </div>
  );
 
};



export default App;
