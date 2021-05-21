import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    text-align: center;
    padding: 20px;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    height: 380px;
    min-height: 380px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -190px;
    margin-left: -145px;
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