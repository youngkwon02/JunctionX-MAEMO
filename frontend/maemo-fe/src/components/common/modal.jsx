import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  text-align: center;
`

const ModalBox = styled.div`
  display: inline-block;
  position: absolute;
  left: 11.5%;
  top: 11.5%;
  height: 75%;
  width: 75%;
  background-color: white;
  border-radius: 30px;
`

const InModal = ({children}) => {
  return (
    <ModalContainer>
      <ModalBox>
        {children}
      </ModalBox>
    </ModalContainer>
  )
}

export default InModal