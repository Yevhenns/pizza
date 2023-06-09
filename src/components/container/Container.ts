import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (min-width: 320px) {
    width: auto;
  }
  @media screen and (min-width: 768px) {
    padding: 0 32px;
    width: 768px;
  }
  @media screen and (min-width: 1280px) {
    padding: 0 16px;
    width: 1280px;
  }
`;
