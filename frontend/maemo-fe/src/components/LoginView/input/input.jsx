import React from 'react';
import styled, {css} from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
    margin-bottom: 10px;
    ${(props) =>
        props.relatePhone &&
        css`
          display: inline-block;
          width: 74%;
          padding-bottom: 0;
    `}
`;

const Input = ({children, ...props}) => {
    return (
        <>
            <StyledInput type="input" {...props} placeholder={props.placeholder}></StyledInput>
        </>
    )
}

export default Input;