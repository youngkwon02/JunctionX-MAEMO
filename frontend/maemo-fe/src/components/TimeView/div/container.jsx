import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    text-align: center;
    padding: 20px;
    width: 280px;
    height: 260px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -180px;
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