import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`

`

const InModal = ({children}) => {
  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  )
}

export default InModal