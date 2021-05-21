import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
`;

const Input = ({...props}) => {
    return (
        <>
            <StyledInput type="input" placeholder={props.placeholder}></StyledInput>
        </>
    )
}

export default Input;