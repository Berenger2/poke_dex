import React from 'react'

    function PokemonCard(props) {
      const { pokemon } = props;
   
      return (
        <div>
          {pokemon && (
        <div className=''>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
          )}
        </div>
      )
    }

    export default PokemonCard
