import React from 'react';
import styled from '@emotion/styled';

// Styled wrapper for the NotAuth component
const CenteredButtonsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #000000; /* Add black border */
  padding: 20px; /* Add padding */
  
  /* Styles for buttons */
  button {
    font-size: 1.2rem; /* Increase font size */
    padding: 10px 20px; /* Increase padding */
    background-color: #ffffff; /* Button background color */
    color: #000000; /* Text color */
    border: none; /* Remove button border */
    border-radius: 5px; /* Add border radius */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }

  /* Hover effect */
  button:hover {
    background-color: #0056b3; /* Darker background color on hover */
  }
`;

const NotAuth = () => {
  return (
    <CenteredButtonsContainer>
      <a href='/login'><button>Login</button></a>
      <a href='/signup'><button>Signup</button></a>
    </CenteredButtonsContainer>
  );
};

export default NotAuth;
