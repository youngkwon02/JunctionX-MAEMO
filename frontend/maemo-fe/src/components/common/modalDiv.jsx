import React from 'react'
import styled from 'styled-components'

const Options = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 10%;
  background-color: red;
`

const ModalOption = ({children}) => {
  return (
    <>
      <Options>{children}</Options>
    </>
  )
}

export default ModalOption