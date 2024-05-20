import React from 'react';
import "./styles.css";


const Search = ({ searchTerm, handleSearch }) => {
  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un Pokémon"
          value={searchTerm}
          onChange={handleSearch}
          autoFocus
        />
      </form>

    </section>
    
  );
};

export default Search;