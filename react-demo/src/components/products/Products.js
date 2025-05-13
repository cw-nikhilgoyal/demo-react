import React from 'react';
import styled from 'styled-components';

const Products = () => {
  return (
    <Container>
      <h1>Products Page</h1>
      <p>Welcome to the products page!</p>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

export default Products;
