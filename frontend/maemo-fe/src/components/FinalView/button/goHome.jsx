import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #fef000;
  color: black;
  border: none;
  font-weight: bold;
  margin-top: 30px;
  border-radius: 14px;
`;

const Button = ({children, ...props}) => {
    const history = useHistory();
    return (
        <>
          <StyledButton onClick={() => history.push(props.url)}>
          {children}
          </StyledButton>
        </>
    )
}

export default Button;