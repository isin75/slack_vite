import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutOutlined } from '@ant-design/icons'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

import Channels from '../../Channels/Channels'
import Users from '../../Users/Users'
import { setUser } from '../../../../store/reducers/AuthSlice'

const SideBar = () => {
  const { name } = useSelector((s) => s.authSlice.user)
  const cookies = new Cookies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    dispatch(setUser())
    cookies.remove('token')
    navigate('/login')
  }
  return (
    <div className="h-full min-w-min w-[220px] left-0 fixed bg-[#3e103f] text-[#E8E2E8] hidden md:block">
      <h1 className="text-white text-xl mb-2 mt-3 px-4 font-serif font-semibold flex justify-between">
        <span>Slack</span>
        <button type="button" className="h-6 w-6" onClick={() => handleClickLogout()}>
          <LogoutOutlined />
        </button>
      </h1>
      <div className="flex items-center mb-6 px-4">
        <span className="bg-[#29A975] rounded-full block w-2 h-2 mr-2">{false}</span>
        <span className="text-purple-lightest">{name}</span>
      </div>
      <Channels />
      <Users userName={name || '[userName]'} />
      <div className="px-4 mb-3 font-sans bottom-2">Applications</div>
    </div>
  )
}

export default SideBar
