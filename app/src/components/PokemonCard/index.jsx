import React, { useState, useEffect } from "react";
import { getPokemonImageUrl } from "../../services/api";
import axios from "axios";
import { PokeballMini } from "../Spinner";

import {
  Card,
  StyledLink,
  CardName,
  CardImg,
  CardDetails,
  CardId,
  CardGet,
  CardInfo,
} from "./styles";

const PokemonCard = ({ pokemon }) => {
  const [imagePokemon, setImagePokemon] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadIdPokemon = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setPokemonId(response.data.id);
        setPokemonTypes(response.data.types);
        setImagePokemon(getPokemonImageUrl(response.data.id));
      } catch (error) {
        console.error("Error loading Pokemon:", error);
      }
      setIsLoading(false);
    };

    loadIdPokemon();
  }, [pokemon.url]);

  const nameCapitalized = pokemon.name.split("-")[0];

  const pokemonType = pokemonTypes.map(
    (type) => type.type.name[0].toUpperCase() + type.type.name.slice(1)
  );

  const handleSelectPokemon = (pokemon) => {
    const storedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];
    const isPokemonAlreadyAdded = storedPokemonList.some(
      (p) => p.name === pokemon.name
    );
    if (isPokemonAlreadyAdded) {
      alert("Le pokemon existe déjà!");
      setIsVisible(true);
    } else {
      const updatedPokemonList = [
        ...storedPokemonList,
        { name: pokemon.name, id: pokemonId, url: pokemon.url },
      ];
      localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
      setIsVisible(true);
    }
  };

  const handleDetail = () => {
    window.location.href = `/pokemon/${pokemonId}`;
  };

  const storedPokemonList = JSON.parse(localStorage.getItem("pokemonList")) || [];
  const isPokemonAlreadyAdded = storedPokemonList.some(
    (p) => p.name === pokemon.name
  );

  const handleRemovePokemon = (pokemon) => {
    const storedPokemonList = JSON.parse(localStorage.getItem("pokemonList")) || [];
    const updatedPokemonList = storedPokemonList.filter(p => p.name !== pokemon.name);
    localStorage.setItem("pokemonList", JSON.stringify(updatedPokemonList));
    window.location.reload();
  };

  if (isLoading) {
    return <PokeballMini />;
  } else if (pokemonId > 807) {
    return <div></div>;
  } else {
    return (
      <StyledLink className=''>
        <Card className={pokemonType[0]}>
          <CardId className={pokemonType[0]}> {pokemonId}</CardId>
          {imageLoading && <PokeballMini />}
          <CardImg
            onLoad={() => {
              setImageLoading(false);
            }}
            src={imagePokemon}
            alt={nameCapitalized}
            style={imageLoading ? null : { display: "block" }}
          />
          <CardName>{nameCapitalized}</CardName>

          {window.location.pathname === "/" ? (
            <>
              {!isPokemonAlreadyAdded && (
                <div className="mt-4" onClick={() => handleSelectPokemon(pokemon)}>
                   
                  <CardGet className={pokemonType[0]}>
                    <i className="heart icon" />
                  </CardGet>
                </div>
              )}
              <div onClick={handleDetail}>
                <CardInfo className={pokemonType[0]}>
                  <i className="info icon" />
                </CardInfo>
              </div>
              <CardDetails>{pokemonType.join(" / ")}</CardDetails>
            </>
          ) : (
            <div>
              <CardDetails>{pokemonType.join(" / ")}</CardDetails>

              <br />
              <br />

              <div onClick={handleDetail}>
                <CardInfo className={pokemonType[0]}>
                  <i className="info icon" />
                </CardInfo>
              </div>

              <div className="mt-4" onClick={() => handleRemovePokemon(pokemon)}>
                <CardGet className={pokemonType[0]}>
                  <i className="trash icon" />
                </CardGet>
              </div>
            </div>
          )}
        </Card>
      </StyledLink>
    );
  }
};

export default PokemonCard;
