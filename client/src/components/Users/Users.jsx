import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUsers, setCurrentChannel } from '../../../store/reducers/chatSlice'

const Users = ({ userName }) => {
  const { currentChannel, users, onlineUsers } = useSelector((s) => s.chatSlice)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickSetCurrentChannel = (channel) => {
    dispatch(setCurrentChannel({ name: channel.name, id: channel._id }))
    navigate(`${channel.name}`)
  }

  const select = 'flex items-center px-4 bg-[#1164A3] py-1 text-white w-full text-left'
  const other = 'flex items-center px-4 py-1 text-[#E8E2E8] w-full text-left'
  const online = 'bg-[#29A975] rounded-full block w-2 h-2 mr-2'
  const offline = 'bg-[#3e103f] border border-slate-400 rounded-full block w-2 h-2 mr-2'

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <div className="px-4 my-3 font-sans">Direct Messages</div>

      <div className="flex items-center w-full">
        <button
          type="button"
          className={userName === currentChannel.id ? select : other}
          onClick={() => handleClickSetCurrentChannel(userName)}
        >
          <span className="bg-[#29A975] rounded-full block w-2 h-2 mr-2">{false}</span>
          <span>{userName}</span> <i className="text-grey text-base font-medium">(me)</i>
        </button>
      </div>
      <div className="max-h-[200px] overflow-x-auto min-h-min">
        {users
          .filter((user) => user.name !== userName)
          .map((it) => {
            return (
              <button
                type="button"
                key={it._id}
                className={it._id === currentChannel.id ? select : other}
                onClick={() => handleClickSetCurrentChannel(it)}
              >
                <span className={onlineUsers.includes(it.name) ? online : offline}>{false}</span>
                <span className="text-purple-lightest">{it.name || it.email}</span>
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default Users
