import React from 'react'
import {useLocation} from 'react-router-dom'

const RequestView = () => {
  const location = useLocation()
  console.log(location.state)
  return (
    <div>{123}</div>
  )
}

export default RequestView
