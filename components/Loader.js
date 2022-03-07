import styled from '@emotion/styled';

export default function Loader() {
  return <LoaderStyled>Loading...</LoaderStyled>;
}

const LoaderStyled = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  background-color: coral;
  color: black;
`;
