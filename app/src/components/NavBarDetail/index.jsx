import React from "react";
import { Link } from "react-router-dom";

import { NavBarStyles, BackContainer, TitleContainer } from "./styles";

const NavBarDetail = () => {
  return (
    <NavBarStyles className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/logo/logo.png"} alt="Pokedex Logo" style={{ width: "200px", height: "80px" }} />
        </Link>

      <TitleContainer className="title-container">
      <h1>Pokemons Detail</h1>
      </TitleContainer>
      <BackContainer>
        <Link to="/pokedex">
          <h2>
            <i className="arrow circle left icon" />
          </h2>
        </Link>
      </BackContainer>
    </NavBarStyles>
  );
};

export default NavBarDetail;
