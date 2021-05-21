import React from 'react';
import styled from 'styled-components';

const StyledRelateType = styled.input`
    width: 100%;
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    font-weight: bold;
`;

const RelateType = ({...props}) => {
    return (
        <>
            <StyledRelateType type="select" placeholder={props.placeholder}></StyledRelateType>
        </>
    )
}

export default RelateType;