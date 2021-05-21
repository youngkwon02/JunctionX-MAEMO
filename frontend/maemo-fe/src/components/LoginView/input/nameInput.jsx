import React from 'react';
import styled from 'styled-components';

const StyledNameInput = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
`;

const NameInput = ({...props}) => {
    return (
        <>
            <StyledNameInput type="input" placeholder={props.placeholder}></StyledNameInput>
        </>
    )
}

export default NameInput;