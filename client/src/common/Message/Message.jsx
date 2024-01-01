import React from 'react'
import moment from 'moment'

const Message = ({ text, isSentByUser, senderName, timestamp }) => {
  const containerStyles = isSentByUser
    ? 'bg-blue-200 rounded-lg p-2 max-w-3/4'
    : 'bg-gray-200 rounded-lg p-2 max-w-3/4'
  const alignClass = isSentByUser ? 'justify-end' : 'justify-start'
  const messageTime = moment(timestamp)
  const today = moment().startOf('day')
  const yesterday = moment().subtract(1, 'days').startOf('day')
  // eslint-disable-next-line no-nested-ternary
  const date = messageTime.isSame(today, 'day')
    ? messageTime.format('HH:mm')
    : messageTime.isSame(yesterday, 'day')
      ? `yesterday ${messageTime.format('HH:mm')}`
      : messageTime.format('MMMM Do YYYY, HH:mm')
  return (
    <div className={`flex ${alignClass} mb-2 mt-2`}>
      <div className={containerStyles}>
        <p className="text-xs text-gray-500 mb-1">
          {senderName} • {date}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}

export default Message
