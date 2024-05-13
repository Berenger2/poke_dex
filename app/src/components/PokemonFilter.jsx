import React from 'react';

const PokemonFilter = ({ searchTerm, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un pokemon"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default PokemonFilter;