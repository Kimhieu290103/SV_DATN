import { Avatar, Typography } from '@mui/material'
import React from 'react'
import { store } from '~/store/store'
import SideTabs from '../User/SideTabs'

interface SideNavProps {
  propName?: string
}

const SideNav: React.FC<SideNavProps> = ({ propName }) => {
  const user = store.getState().user
  return (
    <div className='flex flex-col border border-[#d1d2e0] w-1/4'>
      <div className='flex flex-col justify-center items-center p-5'>
        <Avatar sx={{ width: 100, height: 100 }}>{user?.fullname?.trim().slice(-1)}</Avatar>

        <span
          className=' text-nowrap    text-blue-900 
             sm:text-xs md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-medium'
        >
          Thông tin cá nhân
        </span>
      </div>
      <SideTabs redirectPathname='/user/user-profile' title='Hồ sơ' />
      <SideTabs redirectPathname='/user/activity-point' title='Các hoạt động đã tham gia' />
      <SideTabs redirectPathname='/user/register-event' title='Các sự kiện đã đăng kí' />
      <SideTabs redirectPathname='/user/submit-activity' title='Gửi minh chứng ' />
      <SideTabs redirectPathname='/user/point' title='Điểm phục vụ cộng đồng' />
      <SideTabs redirectPathname='/user/chang-pass' title='Thay đổi mật khẩu' />
    
    </div>
  )
}

export default SideNav
