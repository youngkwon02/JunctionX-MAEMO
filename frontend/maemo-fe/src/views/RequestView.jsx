import React, {useState} from 'react'
import Container from '../components/RequestView/div/container'
import Hello from '../components/RequestView/div/hello'
import TextArea from '../components/RequestView/input/textarea'
import BookingButton from '../components/RequestView/button/booking'
import {useLocation} from 'react-router-dom'

const RequestView = () => {
  const location = useLocation()
  const [msg, setMsg] = useState("")
  console.log(location.state)
  const requestHandler = (e) => {
    setMsg(e.target.value)
  }

  const clickHandler = () => {
    console.log("h",msg)
    console.log({msg, ...location.state})
  }

  return (
    <Container>
      <Hello></Hello>
      <TextArea onChange={requestHandler}></TextArea>
      <BookingButton onClick={clickHandler}>예약하기</BookingButton>
    </Container>
  )
}

export default RequestView
