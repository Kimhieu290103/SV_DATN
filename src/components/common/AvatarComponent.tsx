import React, { MouseEventHandler } from 'react'
import Avatar from '@mui/material/Avatar'
import AvatarDefaulf from "../../assets/images/non-svg/avatar.jpg"
interface AvatarProps {
  alt?: string
  src?: string
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
}

const AvatarComponent: React.FC<AvatarProps> = ({ onMouseEnter, onMouseLeave, src = '' }) => {
  return (
    <Avatar
      alt='avatar'
      src={AvatarDefaulf}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className='w-10 h-10 cursor-pointer'
    />
  )
}

export default AvatarComponent
