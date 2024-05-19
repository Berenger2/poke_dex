import React from "react";

import "./styles.css";

import NavBar from "../../components/NavBar";
import PokemonList from "../../components/PokemonList";
import MyPokemonList from "../../components/MyPokemonList";

function MyPokedex() {
  return (
    <div className="pokedex-container">
      <NavBar />
      <div>
        <MyPokemonList />
      </div>
    </div>
  );
}

export default MyPokedex;
