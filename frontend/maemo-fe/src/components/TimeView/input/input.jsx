import React from 'react'
import styled from 'styled-components'

const NumInput = styled.input`
  width: 40px;
  height: 30px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
  border: 1px solid rgba(10, 10, 10, .2);
`

const Input = ({onChange}) => {
  return (
    <>
      <NumInput onChange={onChange}></NumInput>
    </>
  )
}

export default Input