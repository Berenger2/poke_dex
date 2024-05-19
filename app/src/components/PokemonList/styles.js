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
// export const CardGet = styled.span`
// width: 3rem;
// color: red;
// padding: 0.1rem;
// font-weight: 700;
// position: absolute;
// border-radius: 0 0 0 10px;
// bottom: 0;
// right: 0;
// font-size: 1.5rem;
// `;

