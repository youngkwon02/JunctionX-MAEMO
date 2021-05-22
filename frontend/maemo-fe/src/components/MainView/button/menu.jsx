import React from 'react';
import styled from 'styled-components';

const StyledMenu = styled.button`
    width: 100%;
    height: 50px;
    background-color: #fef000;
    color: black;
    border: none;
    font-weight: bold;
    margin: 10px 0px;
    border-radius: 16px;
`;

const Menu = ({children, history, url}) => {
    return (
        <StyledMenu onClick={() => history.push(url)}>
        {children}
        </StyledMenu>
    )
}

export default Menu;