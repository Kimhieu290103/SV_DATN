import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bigLogo from '~/assets/images/non-svg/logo.png'
import smallLogo from '~/assets/images/svg/smallLogo.svg.png'
import AvatarDropdown from '~/components/common/AvatarDropDown'
import HeaderTabs from './HeaderTabs'
import SearchBar from '../common/SearchBar'
import { store } from '~/store/store'
import { Button } from '@mui/material'

interface Props {
  title?: string
}

const Header: React.FC<Props> = () => {
  const [logo, setLogo] = useState(bigLogo)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const accessToken = store.getState()?.auth?.accessToken
  useEffect(() => {
    const handleResize = () => {
      setLogo(window.innerWidth <= 768 ? smallLogo : bigLogo)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow-xl  text-gray-100 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-white text-blue-900 transition-all duration-300 ease-in-out '
          : 'backdrop-blur-sm'
      }`}
    >
      <nav className='mx-auto px-4 sm:px-6 lg:px-24 md:px-16 text-inherit'>
        <div className='flex items-center justify-between h-16 text-inherit'>
          <div className='flex-shrink-0 sticky w-1/4'>
            <Link to='/' onClick={scrollToTop} className='flex items-center'>
              <div className={window.innerWidth <= 768 ? 'max-h-16 max-w-16' : ''}>
                <img className='w-3/4 h-3/4' src={logo} alt='Logo' />
              </div>
            </Link>
          </div>

          <div className='hidden md:flex items-center justify-center space-x-8 w-1/2 gap-6 h-full'>
            <HeaderTabs isScrolled={isScrolled} redirectPathname='/' title='Giới thiệu' />
            <HeaderTabs
              isScrolled={isScrolled}
              redirectPathname='/activities?eventTypeId=1&page=0&limit=10'
              title='Hoạt động'
            />
          </div>

          <div className='flex items-center space-x-4 justify-end w-1/4'>
            <SearchBar isScrolled={isScrolled}></SearchBar>

            <div className='relative'>
              {!accessToken ? (
                <div>
                  <Button variant='contained' className='bg-blue-900'>
                    <Link to={'/login'}>
                      <span className='font-bold'>Đăng nhập</span>
                    </Link>
                  </Button>
                </div>
              ) : (
                <AvatarDropdown></AvatarDropdown>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className='md:hidden absolute top-4 right-4'>
        <button className={isScrolled ? 'text-blue-900' : 'text-white'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header
