import { useState, useRef } from 'react'
import Avatar from './AvatarComponent'
import { Box, Popper, Typography, Fade, Stack } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '~/store/store'
import { useDispatch } from 'react-redux'
import { logout } from '~/features/auth/authSlice'

const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const accessToken = store.getState().auth.accessToken

  const user = store.getState().user
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Open the Popper when mouse enters the Box
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current) // Clear any pending close timeout
    }
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  // Start a timeout to close the Popper when mouse leaves
  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      setAnchorEl(null)
    }, 200)
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <div onMouseLeave={handleClose} className='h-16'>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }
        }}
      >
        <Avatar
          onMouseEnter={handleOpen}
          src='avatar.jpg'
          alt='User Avatar'
          className='cursor-pointer border-2 border-blue-900 hover:shadow-lg 
          transition-all duration-200'
        />
      </Box>
      <>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement='bottom-end'
          transition
          modifiers={[
            {
              name: 'offset',
              options: { offset: [0, 13] }
            }
          ]}
          sx={{ zIndex: '10000' }}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
          }}
          onMouseLeave={handleClose}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={150}>
              <Box className='w-full bg-white shadow-2xl p-4 md:p-6 lg:p-8 rounded-2xl '>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar src='avatar.jpg' alt='User Avatar'></Avatar>
                  <Typography variant='h6' component='h2'>
                    {user?.fullname}
                  </Typography>
                </Stack>

                <Link to={'/user/user-profile'} onClick={handleClose}>
                  <Typography sx={{ mt: 2 }} className='text-blue-900'>
                    Thông tin cá nhân
                  </Typography>
                </Link>
                <Link to={'/user/activity-point'} onClick={handleClose}>
                  <Typography sx={{ mt: 2 }} className='text-blue-900'>
                    Phục vụ cộng đồng
                  </Typography>
                </Link>
                <Link to={'/user/submit-activity'} onClick={handleClose}>
                  <Typography sx={{ mt: 2 }} className='text-blue-900'>
                    Gửi minh chứng{' '}
                  </Typography>
                </Link>
                <Typography sx={{ mt: 2 }} onClick={handleClose} className='text-blue-900'>
                  {!accessToken ? (
                    <Link to='/login'>Đăng nhập</Link>
                  ) : (
                    <button
                      className='cursor-pointer'
                      onClick={() => {
                        handleLogout()
                      }}
                    >
                      Đăng xuất
                    </button>
                  )}
                </Typography>
              </Box>
            </Fade>
          )}
        </Popper>
      </>
    </div>
  )
}

export default AvatarDropdown
