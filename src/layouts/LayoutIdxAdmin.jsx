import { BackTop } from 'antd'
import React from 'react'
import AdminHeader from './header/AdminHeader1'
import { Outlet } from 'react-router-dom'
import Footer from './footers'

export default function LayoutIdxAdmin() {
  return (
    <>
      <BackTop visibilityHeight={1000}/>
      <div>
        <AdminHeader />
        <Outlet />
         <Footer />
      </div>
    </>
  )
}
