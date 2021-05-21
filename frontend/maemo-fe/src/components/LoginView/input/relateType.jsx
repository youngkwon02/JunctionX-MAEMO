import React from 'react';
import styled from 'styled-components';

const StyledRelateType = styled.select`
    width: 20%;
    height: 32px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
    flex: left;
`;

const RelateType = () => {
    return (
        <>
            <StyledRelateType></StyledRelateType>
        </>
    )
}

export default RelateType;