import styled from "styled-components";

export const PaginationContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;
export const App = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AllPokemon = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
  padding: 1rem;
  margin: 3rem 15rem;
`;
