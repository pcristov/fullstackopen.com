import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error === 1 ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification