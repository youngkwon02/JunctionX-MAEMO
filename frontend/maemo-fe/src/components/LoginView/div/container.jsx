import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    text-align: center;
    padding: 20px;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    height: 420px;
    min-height: 420px;
    max-height: 420px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -210px;
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