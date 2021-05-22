import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import Container from '../components/TimeView/div/container'
import SubmitButton from '../components/TimeView/button/submitButton'
import Input from '../components/TimeView/input/input'

const MainInfo = styled.div`
  text-align: center;
	font-weight: bold;
	margin-bottom: 100px;
`

const Tags = styled.span`
  font-weight: bold;
  line-height: 32px;
  margin: 0px 4px;
  ${(props) =>
    props.head &&
    css`
      margin: 0;
      margin-right: 14px;
  `}
  ${(props) =>
    props.year &&
    css`
      margin: 0 9px;
  `}
`

const Wrapper = styled.div`
  display: block;
  flex-direction: row;
  width: 100%;
  height: 40px;
  margin: 10px 0px;
`

const LeftToggle = styled.div`
  display: inline-block;
  width: 34px;
  height: 30px;
  line-height: 30px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 0.5px solid gray;
  background-color: ${(props) => props.time ? "#fef000" : "white"};
`

const RightToggle = styled.div`
  display: inline-block;
  width: 34px;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 0.5px solid gray;
  background-color: ${(props) => props.time ? "white" : "#fef000"};
  margin-right: 6px;
`



const TimeView = () => {
  const [toggle, setToggle] = useState(true)
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [hour, setHour] = useState("")
  const [min, setMin] = useState("")

  const toggleHandler = () => {
    setToggle(!toggle)
  }

  const yearHandler = (e) => {
    setYear(e.target.value)
    console.log(year)
  }

  const monthHandler = (e) => {
    setMonth(e.target.value)
    console.log(month)
  }

  const dayHandler = (e) => {
    setDay(e.target.value)
    console.log(day)
  }

  const hourHandler = (e) => {
    setHour(e.target.value)
    console.log(hour)
  }

  const minHandler = (e) => {
    setMin(e.target.value)
    console.log(min)
  }


  return (
    <Container>
      <MainInfo>언제 이동하실 예정인가요?</MainInfo>
      <Wrapper>
        <div>
          <Tags head>날짜</Tags>
          <Input onChange={yearHandler} ></Input>
          <Tags year>년</Tags>
          <Input onChange={monthHandler}></Input>
          <Tags>월</Tags>
          <Input onChange={dayHandler}></Input>
          <Tags>일</Tags>
        </div>
      </Wrapper>
      <Wrapper>
        <div>
        <Tags head>시간</Tags>
        <LeftToggle onClick={() => toggleHandler()} time={toggle}>오전</LeftToggle>
        <RightToggle onClick={() => toggleHandler()} time={toggle}>오후</RightToggle>
        <Input onChange={hourHandler}></Input>
        <Tags>시</Tags>
        <Input onChange={minHandler}></Input>
        <Tags>분</Tags>
        </div>
      </Wrapper>
      <SubmitButton>다음</SubmitButton>
    </Container>
  )
}

export default TimeView