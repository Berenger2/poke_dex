import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Pokemons from "./pages/Pokemons";
import PokemonPage from "./pages/Pokemon";
import MyPokedex from "./pages/MyPokedex";



function App() {
  // const newLocal = (
  //   <Routes>
  //     <Route path="/" element={<PokemonList />} />
  //     <Route path="/dex" element={<MyPokedex />} />
  //     <Route path="/pokemon/:id" element={<PokemonDetail />} />
  //   </Routes>
  // );

  const router = createBrowserRouter([
    { path:"/"  ,element:<Pokemons/> },
    { path:"/pokedex", element:<MyPokedex/>},
    { path:"/pokemon/:pokemonIndex", element:<PokemonPage/>}
  ])

  return (
  <RouterProvider router={router}/>
  );
}
//<div style={{ backgroundColor: "#fff" }}>      </div>

export default App;
