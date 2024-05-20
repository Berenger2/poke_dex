import React from "react";

import "./styles.css";

import NavBar from "../../components/NavBar";
import PokemonList from "../../components/PokemonList";
import MyPokemonList from "../../components/MyPokemonList";
import Button from 'react-bootstrap/Button';

function MyPokedex() {
  
  return (
    <div className="pokedex-container">
      <NavBar />
      <div className="center">
        <MyPokemonList />
       
       
      </div>
    </div>
  );
}

export default MyPokedex;
