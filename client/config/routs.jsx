import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout'
import Home from '../src/pages/Home/Home'
import Login from '../src/pages/Auth/Login/Login'
import Register from '../src/pages/Auth/Register/Register'
import AuthProvider from './authProvider'
import PrivateRoute from './privateRouter'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/:channel" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Register />} />
      </Route>
    </Route>
  )
)

export default router
