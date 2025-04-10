import { Typography } from '@mui/material'
import React from 'react'

interface MainContentProps {
  title?: string
  decs?: string
  children: React.ReactNode // Prop children để truyền nội dung động
}

const MainContent: React.FC<MainContentProps> = ({ title, decs, children }) => {
  return (
    <div className='h-full min-h-full border-1 border-l-0  border-b-0 border-[#d1d2e0] flex flex-col items-start justify-start w-full'>
      <div className='flex flex-col justify-center items-center p-5 border-b-[#d1d2e0] border-b-1 w-full'>
        <Typography variant='h5' sx={{ mt: 2, mb: 1, fontWeight: '600' }} className='text-blue-900'>
          {title}
        </Typography>
        <Typography variant='body1' sx={{ fontWeight: '400' }} className='text-blue-900'>
          {decs}
        </Typography>
      </div>
      <div className='flex flex-col justify-center items-center p-5 border-b-[#d1d2e0] border-b-1 w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default MainContent
