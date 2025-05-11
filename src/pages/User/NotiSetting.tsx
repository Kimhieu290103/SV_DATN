import React from 'react'
import SideNav from '~/components/User/SideNav'

interface HomeProps {
  propName?: string
}

const NotiSetting: React.FC<HomeProps> = ({ propName }) => {
  return (
    <div className='min-h-screen flex flex-col m-0 mt-10 mt-30'>
      <div
        className='flex flex-row justify-start items-stretch 
  px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
  sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto rounded-2xl shadow-xl border border-gray-200'
      >
        <SideNav />
      </div>
    </div>
  )
}

export default NotiSetting
