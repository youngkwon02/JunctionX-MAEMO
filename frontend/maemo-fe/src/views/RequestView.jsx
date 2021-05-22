import React, {useState} from 'react'
import Container from '../components/RequestView/div/container'
import Hello from '../components/RequestView/div/hello'
import TextArea from '../components/RequestView/input/textarea'
import BookingButton from '../components/RequestView/button/booking'
import {useHistory, useLocation} from 'react-router-dom'
import {postAxios} from '../api/axios'

const RequestView = () => {
  const history = useHistory()
  const location = useLocation()
  const [msg, setMsg] = useState("")
  const { state } = location
  const requestHandler = (e) => {
    setMsg(e.target.value)
  };

  const clickHandler = async () => {
    try {
      const req = {
        date: state.timeData,
        is_am: state.am,
        start_point_latitude: state.startPosition[0],
        start_point_longitude: state.startPosition[1],
        end_point_latitude: state.endPosition[0],
        end_point_longitude: state.endPosition[1],
        start_point: state.startLocation,
        end_point: state.endLocation,
        requirement_information: msg
      }
      const res = await postAxios('/reservation', req)
      history.push({
        pathname: "/complete",
        state: {
          expected_texi_fare: res.data.expected_texi_fare,
          date: res.data.date, 
          is_am: res.data.is_am,
        }
      })
    } catch (error) {
      console.log(error)
      alert("예약 실패");
      history.push("/main")
    }
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
