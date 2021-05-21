import React from 'react'
import styled from 'styled-components'
import SubmitButton from '../components/TimeView/button/submitButton'
import Input from '../components/TimeView/input/input'

const MainInfo = styled.div`
  text-align: center;
	font-weight: bold;
	margin-bottom: 30px;
`

const Tags = styled.span`
  font-weight: bold;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10%;
`

const TimeView = () => {
  return (
    <>
      <MainInfo>언제 이동하실 예정인가요?</MainInfo>
      <Wrapper>
        <Tags>날짜</Tags>
        <Input></Input>
        <Tags>년</Tags>
        <Input></Input>
        <Tags>월</Tags>
        <Input></Input>
        <Tags>일</Tags>
      </Wrapper>
      <Wrapper>
        <Tags>시간</Tags>
        <Input></Input>
        <Tags>시</Tags>
        <Input></Input>
        <Tags>분</Tags>
      </Wrapper>
      <SubmitButton>다음</SubmitButton>
    </>
  )
}

export default TimeView