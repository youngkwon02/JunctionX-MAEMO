import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import {standardTime} from '../utils/time2str'
import { ReactComponent as CompleteSVG } from '../assets/complete.svg'

const Info = styled.div`
  width: 100%;
  height: 30px;
`;


const CompleteView = () => {
  const location = useLocation()
  const { state } = location
  console.log(state)
  return (
    <> 
      <CompleteSVG></CompleteSVG>
      <Info>{standardTime(state.date, state.is_am)}</Info>
      <Info>예약 완료</Info>
      <Info>{`예상 금액은 ${state.expected_texi_fare}원 입니다`}</Info>
    </>
  )
}

export default CompleteView