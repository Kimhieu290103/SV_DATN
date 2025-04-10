import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import loginSchema from '~/schema/loginSchema'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '~/features/auth/authActions'
import { setUser } from '~/features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { store, AppDispatch, RootState } from '~/store/store'
interface LoginFormValues {
  username: string
  password: string
}
//TODO: add a spinner for loading and toast for every noti(utils)
const LoginPage: React.FC = () => {
  // const { loading, error, success } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) })
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const loginResults = await dispatch(login(data))
      if (login.fulfilled.match(loginResults)) {
        const user = loginResults.payload.userResponse
        if (user) {
          dispatch(
            setUser({
              id: user.id,
              fullname: user.fullname,
              phoneNumber: user.phoneNumber, //number ?
              studentId: user.studentId,
              address: user.address,
              email: user.email,
              dateOfBirth: user.dateOfBirth,
              username: user.username,
              active: true
            })
          )
        }
      }
      //toast
      console.log('Đăng nhập thành công')
      navigate('/')
    } catch (error) {
      //toast show loi
      console.log('error while login', error)
    }
  }
  return (
    <div className='bg-white min-h-screen flex flex-col justify-center items-center p-4'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-6'>
        <div className='mb-6'>
          <h1 className='font-inter text-center text-4xl font-bold text-blue-900'>Đăng nhập</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Username</label>
            <input
              {...register('username')}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
              required
            />
            {errors.username && <p className='mt-1 text-sm text-red-600'>{errors.username.message}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              {...register('password')}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
              required
            />
            {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
          </div>
          <div className='my-5 text-right'>
            <Link to='/forget-password-username' className='text-blue-900 text-sm hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-900 hover:bg-blue-800 text-white 
          font-bold py-2 px-4 rounded cursor-pointer'
          >
            Đăng nhập
          </button>
        </form>
            {/* Thêm dòng chuyển hướng đến trang đăng ký */}
      <div className='text-center mt-4'>
        <p className='text-sm text-gray-600'>
          Chưa có tài khoản?{' '}
          <Link to='/register' className='text-blue-900 hover:underline font-medium'>
            Đăng ký ngay
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
