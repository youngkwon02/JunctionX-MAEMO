import React from 'react';
import styled from 'styled-components';

const StyledHello = styled.div`
    color: black;
    font-weight: bold;
    border: none;
    font-size: 1.2em;
		word-break: keep-all;
    margin-bottom: 30px;
    text-align: center;
`;

const Hello = ({children}) => {
    return (
        <>
        	<StyledHello>
          기사님께 요청사항이 있으신가요?
          {children}
          </StyledHello>
        </>
    )
}

export default Hello;