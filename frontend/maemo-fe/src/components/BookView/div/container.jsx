import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    text-align: center;
    width: 90%;
    margin: auto;
    margin-top: 50px;
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