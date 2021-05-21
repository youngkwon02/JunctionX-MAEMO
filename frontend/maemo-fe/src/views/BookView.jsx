import React from 'react';
import styled from 'styled-components';
import BookElem from "../components/BookView/div/bookElem";
import BookElemTop from "../components/BookView/div/bookElemTop";

const BookView = () => {
  const data = {
    "time":"2021년 5월 22일 오후 5시",
    "start":"중앙대학교 정문",
    "end":"동묘앞역"
  };
  
  const BookTitle = styled.div`
    font-size: 1.2em;
		text-align: center;
		font-weight: bold;
		margin-bottom: 30px;
	`;

  return (
    <>
      <BookTitle>예약 현황</BookTitle>
      <BookElem data={data}>
      <BookElemTop>예약 번호 01</BookElemTop>
      </BookElem>
    </>
  );
  
}

export default BookView;