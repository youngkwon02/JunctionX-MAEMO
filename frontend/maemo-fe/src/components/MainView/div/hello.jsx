import React from 'react';
import styled from 'styled-components';
import oH from '../../../assets/oH.png'

const ImageContainer = styled.div`
    width: 100%;
    height: 160px;
`;

const StyledHello = styled.div`
    color: black;
    font-weight: bold;
    border: none;
    font-size: 1.2em;
		word-break: keep-all;
    margin-bottom: 50px;
`;

const Hello = ({children}) => {
    return (
        <>
          <ImageContainer>
            <img src={oH} alt="ProfileImg" width="100%" height="100%" />
          </ImageContainer>
        	<StyledHello>
          {children} 님<br />
					무엇을 도와드릴까요?
          </StyledHello>
        </>
    )
}

export default Hello;