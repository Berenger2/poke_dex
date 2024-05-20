import React from "react";

import "./styles.css";

import NavBar from "../../components/NavBar";
import PokemonList from "../../components/PokemonList";
import MyPokemonList from "../../components/MyPokemonList";
import Button from 'react-bootstrap/Button';

function MyPokedex() {
  const handleRemoveAllPokemon = () => {
    localStorage.removeItem("pokemonList");
    window.location.reload();

    // setFilteredPokemonList([]);
};
  return (
    <div className="pokedex-container">
      <NavBar />
      <div className="center">
        <MyPokemonList />
       
        <div className="d-flex justify-content-center mt-4" >
        <Button variant="warning" size="lg" onClick={handleRemoveAllPokemon}>
        Vider Mon pokemon dex
        </Button>
    </div>
      </div>
    </div>
  );
}

export default MyPokedex;
