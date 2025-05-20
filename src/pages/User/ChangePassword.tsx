import React, { useState } from 'react'
// import { store } from '~/store/store'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import { Button, TextField, Alert } from '@mui/material'
import UserApi from '~/api/UserApi'

const ChangePassword: React.FC = () => {
  // const userId = store.getState().user?.id

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  // State để lưu thông báo lỗi cho từng trường
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Hàm để xử lý sự kiện nhập liệu và xóa lỗi khi người dùng nhập
  const handleInputChange = (field: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '', // Xóa lỗi khi người dùng nhập
    }))
  }

  const handleChangePassword = async () => {
    // Kiểm tra các lỗi trước khi gọi API
    let isValid = true
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    // Kiểm tra nếu chưa nhập mật khẩu hiện tại
    if (!currentPassword) {
      newErrors.currentPassword = 'Mật khẩu hiện tại không được bỏ trống'
      isValid = false
    }

    // Kiểm tra nếu chưa nhập mật khẩu mới
    if (!newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được bỏ trống'
      isValid = false
    }

    // Kiểm tra nếu chưa nhập lại mật khẩu mới
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không được bỏ trống'
      isValid = false
    }

    // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận không khớp
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu mới và xác nhận mật khẩu không khớp'
      isValid = false
    }

    // Nếu có lỗi, cập nhật lỗi và dừng việc gửi yêu cầu
    if (!isValid) {
      setErrors(newErrors)
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
    } catch (error: unknown) {
      console.error('Lỗi khi đổi mật khẩu:', error)
      setMessage({ type: 'error', text: 'Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex flex-col m-0 min-h-[280px mt-10] mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-100'>
      <div
        className='flex flex-row justify-start items-stretch 
        px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
        sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto rounded-2xl shadow-xl border border-gray-200  mt-20 mb-20'
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
                onChange={(e) => {
                setCurrentPassword(e.target.value)
                handleInputChange('currentPassword')
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 50,
                  borderRadius: 2,
                },
              }}
                error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword}
            />
            {/* Trường mật khẩu mới */}
            <TextField
              label='Mật khẩu mới'
              type='password'
              fullWidth
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                handleInputChange('newPassword')
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 50,
                  borderRadius: 2,
                },
              }}
               error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
            />
            {/* Trường xác nhận mật khẩu mới */}
            <TextField
              label='Nhập lại mật khẩu mới'
              type='password'
              fullWidth
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                handleInputChange('confirmPassword')
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 50,
                  borderRadius: 2,
                },
              }}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />

            {/* Nút xác nhận thay đổi mật khẩu */}
            <Button
              variant='contained'
              color='primary'
              onClick={handleChangePassword}
              disabled={loading}
              className=" w-full h-12 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
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
