import React from 'react'

const Loading = ({ message }) => (
  <div className="loader-container">
    <div className="loader" />
    <p>{message}</p>
  </div>
)

export default Loading