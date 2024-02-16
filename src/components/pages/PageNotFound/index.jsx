import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the container height to full viewport height */
`;

const NotFoundText = styled.p`
  font-size: 36px; /* Increase font size */
  color: #333;
  margin-bottom: 20px;
`;

const HomePageLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 18px;
`;

const PageNotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundText>Page Not Found</NotFoundText>
      <HomePageLink to="/">Home Page</HomePageLink>
    </NotFoundContainer>
  );
};

export default PageNotFound;
