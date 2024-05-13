import React from 'react'

    function PokemonCard(props) {
      const { pokemon } = props;
      // console.log(pokemon);
      const handleSelectPokemon = (pokemon) => {
        const storedPokemonList = JSON.parse(localStorage.getItem('pokemonList')) || [];
        const isPokemonAlreadyAdded = storedPokemonList.some((p) => p.name === pokemon.name);
        if (!isPokemonAlreadyAdded) {
          const updatedPokemonList = [...storedPokemonList, pokemon];
          localStorage.setItem('pokemonList', JSON.stringify(updatedPokemonList));
        }
      }
      return (
        <div>
          {pokemon && (
        <div className=''>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <button onClick={() => handleSelectPokemon(pokemon)}>Ajouter</button>
        </div>
          )}
        </div>
      )
    }

    export default PokemonCard
