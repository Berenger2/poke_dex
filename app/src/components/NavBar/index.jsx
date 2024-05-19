import React from "react";
import { Link } from "react-router-dom";

import { NavBarStyles, BackContainer, TitleContainer } from "./styles";

const NavBar = () => {

  const activeLink = window.location.pathname;

  return (
    <NavBarStyles className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top " style={{ position: "absolute" }}>
      <Link to="/">
        <img src={process.env.PUBLIC_URL + "/logo/logo.png"} alt="Pokedex Logo" style={{ width: "300px", height: "80px" }} />
      </Link>

      <TitleContainer className="title-container">
        <h1>Pokemons challenge</h1>
      </TitleContainer>
      <BackContainer>
        {activeLink === "/pokedex" ? (
          <Link to="/">
            <h2><i className="arrow circle left icon" /> Pokemons</h2>
          </Link>
        ) : (
          <Link to="/pokedex">
            <h2><i className="arrow circle right icon" /> Mon Pokedex</h2>
          </Link>
          
        )}
      </BackContainer>
    </NavBarStyles>
  );
};

export default NavBar;
