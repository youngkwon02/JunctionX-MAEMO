import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {getAxios} from '../api/axios'

const NumWirhStr = styled.div`
  width: 100%;
  height: 20%;
`

const FinalView = () => {
  const history = useHistory();
  const [originFare, setOriginFare] = useState("")
  const [fare, setFare] = useState("")
  const [profit, setProfit] = useState(true)

  const getFare = async () => {
    try {
      const res = await getAxios('/location')
      const { data } = res
      setFare(""+Math.abs(data.fare_difference))
      setOriginFare(""+data.actual_taxi_fare)
      setProfit(data.is_profit)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFare()
  }, [])


  return (
    <> 
      <NumWirhStr>결제 금액 {`${originFare}원`}</NumWirhStr>
      <NumWirhStr>예상 금액보다 {`${fare}원`} {profit ? `낮습니다.` : `높습니다.`}</NumWirhStr>
    </>
  )
}

export default FinalView