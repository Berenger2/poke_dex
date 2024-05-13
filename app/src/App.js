import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import PokemonList from "./components/PokemonList";
import MyPokedex from "./components/MyPokedex";
// import ErrorPage from "./ErrorPage";

function App() {
  const newLocal = (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/dex" element={<MyPokedex />} />
    </Routes>
  );
  return (
    <div className="App">
      <Link to="/">Pokemons</Link> <br/>
      <Link to="/dex">Mon Pokedex</Link>
      {newLocal}
    </div>
  );
}

export default App;
