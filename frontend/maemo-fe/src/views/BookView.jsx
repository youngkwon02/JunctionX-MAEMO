import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Container from '../components/BookView/div/container'
import BookElem from "../components/BookView/div/bookElem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getRandomKey } from '../utils/random'
import { useHistory } from 'react-router-dom';
import { getAxios } from '../api/axios';

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
const BookTitle = styled.div`
font-size: 1.2em;
text-align: center;
font-weight: bold;
margin-bottom: 30px;
`;

const BackIconBox = styled.div`
width: 20px;
height: 20px;
`

const BookView = () => {
  const history = useHistory();
  const [reservation, setReservation] = useState([])

  const getBookList = async () => {
    try {
      const res = await getAxios('/reservation')
      setReservation(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookList()
  }, [])

  const Books = reservation.map((book, idx) => (<BookElem key={getRandomKey()} data={book} num={idx+1}></BookElem>));

  return (
    <Container>
      <BackIconBox>
        <ArrowBackIcon onClick={() => history.push("/main")}></ArrowBackIcon>
      </BackIconBox>
      <BookTitle>예약 현황</BookTitle>
      {Books}
    </Container>
  );
  
}

export default BookView;