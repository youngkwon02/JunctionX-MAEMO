import React from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import enterImg from '../assets/enter.svg'

const MainView = () => {
  const history = useHistory();

  return (
    <div style={{width: "100%", height: "100vh"}}>
    <img width="100%" height="100%" src={enterImg}></img>
    </div>
  );
  
}

export default MainView;