import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    text-align: center;
    padding: 20px;
    width: 280px;
    height: 52vh;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -26vh;
    margin-left: -160px;
`;

const Container = ({children, ...props}) => {
    return (
        <>
          <StyledContainer>
          {children}
          </StyledContainer>
        </>
    )
}

export default Container;