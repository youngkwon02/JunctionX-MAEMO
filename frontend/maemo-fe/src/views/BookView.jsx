import React from 'react';
import styled from 'styled-components';
import Container from '../components/BookView/div/container'
import BookElem from "../components/BookView/div/bookElem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getRandomKey } from '../utils/random'
import { useHistory } from 'react-router-dom';

const bookList = [
  {
    "seq": "01",
    "time": "2021년 5월 22일 오후 5시",
    "start": "중앙대학교 정문",
    "end": "동묘앞역"
  },
  {
    "seq": "02",
    "time": "2021년 5월 23일 오후 7시",
    "start": "동묘앞역",
    "end": "중앙대학교 정문"
  }
];

const BookView = () => {
  const history = useHistory();
 
  const BookTitle = styled.div`
    font-size: 1.2em;
		text-align: center;
		font-weight: bold;
		margin-bottom: 30px;
	`;

  const Books = bookList.map((book) => (<BookElem key={getRandomKey()} data={book}></BookElem>));

  const BackIconBox = styled.div`
    width: 20px;
    height: 20px;
  `

  return (
    <Container>
      <BackIconBox>
        <ArrowBackIcon onClick={() => history.push("/")}></ArrowBackIcon>
      </BackIconBox>
      <BookTitle>예약 현황</BookTitle>
      {Books}
    </Container>
  );
  
}

export default BookView;