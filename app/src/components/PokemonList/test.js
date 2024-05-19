





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

if (isLoading) {
  return <PokeballMini />;
} else if (pokemonId > 807) {
  return <div></div>;
} else {
  return (
    <StyledLink to={`pokemon/${pokemonId}`}>
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
        <div onClick={() => console.log("Div clicked!")}>
          <CardGet className={pokemonType[0]}><i className="heart icon" /></CardGet>
        </div>
        <div onClick={() => console.log("Div clicked!")}>
          <CardInfo className={pokemonType[0]}><i className="info icon" /></CardInfo>
        </div>
        <CardDetails>{pokemonType.join(" / ")}</CardDetails>
      </Card>
    </StyledLink>
  );
}
};

export default PokemonCard;
