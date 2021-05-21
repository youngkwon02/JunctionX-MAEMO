import React from 'react';
import styled from 'styled-components';

const StyledLoginInput = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
`;

const LoginInput = ({...props}) => {
    return (
        <>
            <StyledLoginInput type="input" placeholder={props.placeholder}></StyledLoginInput>
        </>
    )
}

export default LoginInput;