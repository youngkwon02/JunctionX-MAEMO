import React from 'react'
import {useLocation} from 'react-router-dom'

const CompleteView = () => {
  const location = useLocation()
  const { state } = location
  console.log(state)
  return (
    <div>completeView</div>
  )
}

export default CompleteView