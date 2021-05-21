import React from 'react'
import styled from 'styled-components'

const Options = styled.div`
  margin-top: 5%;
  line-height: 40px;
  width: 100%;
  height: 40px;
  background-color: white;
  border-radius: 30px;
  &:hover {
    background-color: yellow;
  }
`

const ModalOption = ({children, ...props}) => {
  return (
    <>
      <Options onClick={(e) => {
        props.onClick(e)
        props.onClose()
      }}>{children}</Options>
    </>
  )
}

export default ModalOption