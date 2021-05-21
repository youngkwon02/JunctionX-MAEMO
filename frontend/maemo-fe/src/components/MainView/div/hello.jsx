import React from 'react';
import styled from 'styled-components';

const StyledHello = styled.div`
    color: black;
    font-weight: bold;
    border: none;
    font-size: 1.2em;
		word-break: keep-all;
`;

const Hello = ({children}) => {
    return (
        <>
        	<StyledHello>
          {children} 님<br />
					무엇을 도와드릴까요?
          </StyledHello>
        </>
    )
}

export default Hello;