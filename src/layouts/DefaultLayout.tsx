import React from 'react'
import Footer from '~/components/Home/Footer'
import Header from '~/components/Home/Header'

import { Outlet } from 'react-router-dom'

interface Props {
  propName?: string
}

// const DefaultLayout: React.FC<Props> = ({ children }) => {
const DefaultLayout: React.FC<Props> = () => {
  return (
    <>
      <div className='bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg'>
        <Header></Header>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
      <div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default DefaultLayout
