import { Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  redirectPathname: string
  title: string
}

const SideTabs: React.FC<Props> = ({ redirectPathname, title }) => {
  const location = useLocation()
  const isActive = location.pathname === redirectPathname

  return (
    <div
      className={`flex flex-col justify-center items-start w-full
          ${isActive ? ' text-blue-500 bg-blue-100' : ''}
    `}
    >
      <Link
        to={`${redirectPathname}`}
        className={`flex flex-col justify-center items-start  font-bold   
           rounded-lg  text-nowrap h-full text-center py-1 pl-4 mr-auto`}
      >
        <Typography variant='body1'>{title}</Typography>
      </Link>
    </div>
  )
}

export default SideTabs
