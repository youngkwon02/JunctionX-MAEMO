import React from 'react';
import styled, {keyframes} from 'styled-components';
import warning from '../../../assets/warning.svg'
import closeBtn from '../../../assets/closeBtn.svg'

const layerFade = keyframes`
  0% {
    background-color: rgba(242, 230, 146, .5);
  }
  50% {
    background-color: rgba(242, 230, 146, 0);
  }
  100% {
    background-color: rgba(242, 230, 146, .5);
  }
`

const StyledLayer = styled.div`
    display: none;
    text-align: center;
    width: 100%;
    height: 100vh;
    animation: ${layerFade} 1s infinite ease-in;
    background-color: rgba(242, 230, 146, .5);
    position: absolute;
    top: 0;
    left: 0;
`;

const ImageContainer = styled.div`
  width: 70%;
  height: 50vh;
  font-weight: bold;
  background-color: white;
  border-radius: 16px;
  margin: auto;
  margin-top: 25vh;
`;


const Layer = ({children, ...props}) => {
    return (
        <>
          <StyledLayer id={props.id}>
          <ImageContainer>
          <img src={warning} alt="ProfileImg" width="100%" height="50%" style={{"margin": "10px 0px"}}/>
          {children}
          <img src={closeBtn} width="40px" height="40px" ></img>
          </ImageContainer>
          </StyledLayer>
        </>
    )
}

export default Layer;