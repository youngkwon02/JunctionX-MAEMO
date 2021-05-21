import React from 'react'
import styled from 'styled-components'

const NumInput = styled.input`
  width: 50px;
`

const Input = ({onChange}) => {
  return (
    <>
      <NumInput onChange={onChange}></NumInput>
    </>
  )
}

export default Input