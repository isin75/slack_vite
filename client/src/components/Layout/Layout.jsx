import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from './SideBar/SideBar'

const Layout = () => {
  const location = useLocation()
  const shouldShowSidebar = location.pathname !== '/login' && location.pathname !== '/registration'
  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowSidebar ? (
        <>
          <header>
            <Header />
          </header>
          <main className="flex-grow flex justify-center items-center h-full">
            <SideBar />
            <Outlet />
          </main>
          <footer className="">
            <Footer />
          </footer>
        </>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-[#4A144A]">
          <Outlet />
        </div>
      )}
    </div>
  )
}

export default Layout
