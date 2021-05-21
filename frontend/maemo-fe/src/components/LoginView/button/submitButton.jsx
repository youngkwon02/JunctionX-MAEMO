import React from 'react';
import styled from 'styled-components';

const StyledSubmitButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #fef000;
    color: black;
    border: none;
    font-weight: bold;
    margin-top: 30px;
    border-radius: 14px;
`;

const SubmitButton = ({children}) => {
    return (
        <StyledSubmitButton type="submit">
        {children}
        </StyledSubmitButton>
    )
}

export default SubmitButton;