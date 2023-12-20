import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout'
import Home from '../src/pages/Home/Home'
import Login from '../src/pages/Auth/Login/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

export default router
