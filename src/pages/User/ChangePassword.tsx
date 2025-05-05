import React, { useState } from 'react'
import { store } from '~/store/store'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import { Button, TextField, Alert } from '@mui/material'
import UserApi from '~/api/UserApi'

const ChangePassword: React.FC = () => {
  const userId = store.getState().user?.id

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    // Kiểm tra mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp!' })
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      // Gọi API thay đổi mật khẩu
      const response = await UserApi.changePass(currentPassword, newPassword)

      if (response) {
        setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (error: any) {
      console.error('Lỗi khi đổi mật khẩu:', error)
      setMessage({ type: 'error', text: 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col m-0 min-h-[280px]'>
      <div
        className='flex flex-row justify-start items-stretch 
        px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
        sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto'
      >
        <SideNav />
        <MainContent title='Đổi mật khẩu' decs='Thay đổi mật khẩu tài khoản của bạn tại đây.'>
          <div className='flex flex-col gap-4 max-w-md'>
            {/* Hiển thị thông báo lỗi hoặc thành công */}
            {message && <Alert severity={message.type}>{message.text}</Alert>}

            {/* Trường mật khẩu hiện tại */}
            <TextField
              label='Mật khẩu hiện tại'
              type='password'
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {/* Trường mật khẩu mới */}
            <TextField
              label='Mật khẩu mới'
              type='password'
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {/* Trường xác nhận mật khẩu mới */}
            <TextField
              label='Nhập lại mật khẩu mới'
              type='password'
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Nút xác nhận thay đổi mật khẩu */}
            <Button
              variant='contained'
              color='primary'
              onClick={handleChangePassword}
              disabled={loading}
              className='mt-4'
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </div>
        </MainContent>
      </div>
    </div>
  )
}

export default ChangePassword
