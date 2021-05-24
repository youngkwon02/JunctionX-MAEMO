import React, { useState, useEffect } from 'react'
import styled, {css} from 'styled-components'
import {getAxios} from '../api/axios'
import Container from '../components/FinalView/div/container'
import Button from '../components/FinalView/button/goHome'
import logo from '../assets/logo.svg'
import check from '../assets/check.svg'

const FinalView = () => {
  const [originFare, setOriginFare] = useState("")
  const [fare, setFare] = useState("")
  const [profit, setProfit] = useState(true)

  const ContentBox = styled.div`
    margin-top: -50px;
  `

  const Line = styled.div`
    ${(props) =>
      props.bold &&
      css`
        font-size: 1.4em;
        font-weight: bold;
        margin-bottom: 20px;
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
    ${(props) =>
      props.smallWidth &&
      css`
        width: 74%;
        display: inline-block;
    `}
  `

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
    <Container> 
      <img src={logo} width="200px"></img>
      <ContentBox>
        <Line bold>이용 종료</Line>
        <Line>편안한 여정 되셨나요?</Line>
        <Line>이용해주셔서 감사합니다.</Line><br/><br/>
        <Line inline>결제 금액&nbsp;&nbsp;</Line><Line underline>{`${originFare}원`}</Line><br />
        <Line smallWidth>
          <Line inline>예상 금액보다&nbsp;&nbsp;</Line><br/><Line underline>{`${fare}원`}</Line><Line inline>&nbsp;{profit ? `낮습니다.` : `높습니다.`}</Line>
        </Line><br/>
        <Button url='/main'>홈으로 돌아가기</Button>
      </ContentBox>
    </Container>
  )
}

export default FinalView
