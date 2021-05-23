import React, { useState } from 'react';
import Container from "../components/MainView/div/container";
import Hello from "../components/MainView/div/hello";
import Menu from "../components/MainView/button/menu";
import { useHistory } from 'react-router-dom';

const MainView = () => {
  const history = useHistory();
  const [name, setName] = useState("오지영")

  return (
    <Container>
      <Hello>{ name }</Hello>
      <Menu history={history} url={"/time"}>예약하기</Menu>
      <Menu history={history} url={"/book"}>예약현황</Menu>
      <Menu history={history} url={"/tracking"}>실시간 정보</Menu>
    </Container>
  );
  
}

export default MainView;