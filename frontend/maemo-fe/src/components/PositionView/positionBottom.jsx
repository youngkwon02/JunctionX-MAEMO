import React from 'react';
import styled from 'styled-components';

const StyledPositionBottom = styled.div`
    width: calc(100% - 40px);
    height: 30%;
    background-color: white;
    color: black;
    border: none;
    font-weight: bold;
    margin: 10px 0px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    position: absolute;
    bottom: 0;
    margin: 0;
    padding: 0px 20px;
    padding-top: 20px;
`;

const PositionBottom = ({children, url}) => {
    return (
        <StyledPositionBottom>
        {children}
        </StyledPositionBottom>
    )
}

export default PositionBottom;