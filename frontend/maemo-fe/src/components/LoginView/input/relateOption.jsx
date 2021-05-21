import React from 'react';
import styled from 'styled-components';

const StyledRelateOption = styled.input`
    color: black;
    font-weight: bold;
`;

const RelateOption = ({...props}) => {
    return (
        <>
            <StyledRelateOption type="select" value={props.value}></StyledRelateOption>
        </>
    )
}

export default RelateOption;