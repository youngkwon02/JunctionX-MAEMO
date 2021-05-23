import React from 'react'
import styled, {css} from 'styled-components'
import {useLocation} from 'react-router-dom'
import {standardTime} from '../utils/time2str'
import { ReactComponent as CompleteSVG } from '../assets/complete.svg'
import Container from '../components/CompleteView/div/container'
import Button from '../components/CompleteView/button/goHome'

const Info = styled.div`
  width: 100%;
  ${(props) =>
    props.bold &&
    css`
      font-size: 1.4em;
      font-weight: bold;
      margin: 6px 0px;
  `}
  ${(props) =>
    props.inline &&
    css`
      width: auto;
      display: inline-block;
  `}
  ${(props) =>
    props.underline &&
    css`
      width: auto;
      display: inline-block;
      border-bottom: 1px solid black;
      font-weight: bold;
  `}
`;


const CompleteView = () => {
  const location = useLocation()
  const { state } = location
  console.log(state)
  return (
    <Container> 
      <CompleteSVG></CompleteSVG>
      <Info>{standardTime(state.date, state.is_am)}</Info>
      <Info bold>예약 완료</Info><br/>
      <Info inline>예상 금액&nbsp;&nbsp;</Info><Info underline>{state.expected_texi_fare}원</Info>
      <Button url='/main'>홈으로 돌아가기</Button>
    </Container>
  )
}

export default CompleteView