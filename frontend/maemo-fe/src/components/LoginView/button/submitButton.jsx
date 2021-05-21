import React from 'react';
import styled from 'styled-components';

const StyledSubmitButton = styled.button`
    width: 100ox;
    height: 100px;
    border-radius: 12px;
    background-color: #blue;
    color: black;
`;

const SubmitButton = ({text}) => {
    return (
        <StyledSubmitButton type="submit">
            {text}
        </StyledSubmitButton>
    )
}