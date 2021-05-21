import React, {useState} from 'react'
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

const LeftToggle = styled.div`
  width: 60px;
  height: 40px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 0.5px solid gray;
  background-color: ${(props) => props.time ? "#fef000" : "white"};
`

const RightToggle = styled.div`
  width: 60px;
  height: 40px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 0.5px solid gray;
  background-color: ${(props) => props.time ? "white" : "#fef000"};
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
    <>
      <MainInfo>언제 이동하실 예정인가요?</MainInfo>
      <Wrapper>
        <Tags>날짜</Tags>
        <Input onChange={yearHandler} ></Input>
        <Tags>년</Tags>
        <Input onChange={monthHandler}></Input>
        <Tags>월</Tags>
        <Input onChange={dayHandler}></Input>
        <Tags>일</Tags>
      </Wrapper>
      <Wrapper>
        <Tags>시간</Tags>
        <LeftToggle onClick={() => toggleHandler()} time={toggle}>오전</LeftToggle>
        <RightToggle onClick={() => toggleHandler()} time={toggle}>오후</RightToggle>
        <Input onChange={hourHandler}></Input>
        <Tags>시</Tags>
        <Input onChange={minHandler}></Input>
        <Tags>분</Tags>
      </Wrapper>
      <SubmitButton>다음</SubmitButton>
    </>
  )
}

export default TimeView