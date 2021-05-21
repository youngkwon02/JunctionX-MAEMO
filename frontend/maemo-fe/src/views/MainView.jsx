import React, { useEffect, useState } from 'react';
import Hello from "../components/MainView/div/hello";
import Menu from "../components/MainView/button/menu";


const MainView = () => {
  const [name, setName] = useState("김영권")
  useEffect(() => {
    console.log("Mount!");
  })
  
  return (
    <>
      <Hello>{ name }</Hello>
      <Menu>예약하기</Menu>
      <Menu>예약현황</Menu>
      <Menu>실시간 정보</Menu>
    </>
  );
  
}

export default MainView;