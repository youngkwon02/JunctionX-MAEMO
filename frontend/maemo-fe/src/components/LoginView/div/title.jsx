import React from 'react';
import styled from 'styled-components';

const StyledInputTitle = styled.div`
    color: black;
    font-weight: bold;
    border: none;
    font-size: .8em;
`;

const InputTitle = ({children}) => {
    return (
        <>
            <StyledInputTitle>
            {children}
            </StyledInputTitle>
        </>
    )
}

export default InputTitle;