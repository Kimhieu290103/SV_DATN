import { Link, useLocation } from 'react-router-dom'

interface Props {
  isScrolled?: boolean
  redirectPathname: string
  title: string
}

const HeaderTabs: React.FC<Props> = ({ isScrolled = false, redirectPathname, title }) => {
  const location = useLocation()
  const isActive = location.pathname === redirectPathname

  return (
    <div
      className={`flex flex-col justify-center items-center h-full
          ${isActive ? ' border-b-2 border-blue-900' : ''}
    `}
    >
      <Link
        to={`${redirectPathname}`}
        className={`flex flex-col justify-center items-center transition-all duration-300 font-bold    rounded-lg  text-nowrap h-full text-center
          ${
            isScrolled || location.pathname !== '/'
              ? 'text-blue-900  hover:text-[var(--primary)]'
              : 'text-white hover:text-blue-900'
          }`}
      >
        {title}
      </Link>
    </div>
  )
}

export default HeaderTabs
