
import React, { useState } from 'react'; // Import useState
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import loginSchema from '~/schema/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '~/features/auth/authActions';
import { setUser } from '~/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store/store';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.auth); // Theo dõi trạng thái auth
  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null); // State để quản lý lỗi đăng nhập

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);// Reset lỗi khi người dùng thử đăng nhập lại
    try {

      await new Promise(resolve => setTimeout(resolve, 2000));
      const loginResults = await dispatch(login(data));
      if (login.fulfilled.match(loginResults)) {
        const user = loginResults.payload.userResponse;
        if (user) {
          dispatch(
            setUser({
              id: user.id,
              fullname: user.fullname,
              phoneNumber: user.phoneNumber,
              studentId: user.studentId,
              address: user.address,
              email: user.email,
              dateOfBirth: user.dateOfBirth,
              username: user.username,
              active: true,
            })
          );
          console.log('Đăng nhập thành công');
          navigate('/');
          // TODO: Thêm toast thông báo thành công nếu cần
        }
      } else if (login.rejected.match(loginResults)) {
        console.log('Đăng nhập thất bại:', loginResults.payload);
        // Kiểm tra payload và hiển thị thông báo lỗi phù hợp
        if (
          loginResults.payload &&
          typeof loginResults.payload === 'object' &&
          'message' in loginResults.payload
        ) {
            setLoginError((loginResults.payload as { message: string }).message);
        } else if (typeof loginResults.payload === 'string') {
          setLoginError(loginResults.payload);
        } else {
          setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
        }
        // Không navigate('/') khi đăng nhập thất bại
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error);
      setLoginError('Đã xảy ra lỗi không mong muốn.');
      // TODO: Hiển thị toast thông báo lỗi chung
    }
    finally {
      setIsLoading(false); // Kết thúc loading sau khi xử lý xong
    }
  };

  return (
    <div className='bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen flex flex-col justify-center items-center p-4'>
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
          {loginError && <p className='mt-2 text-sm text-red-600'>{loginError}</p>} 
          <div className='my-5 text-right'>
            <Link to='/forgot-password' className='text-blue-900 text-sm hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer'
            disabled={loading} // Vô hiệu hóa nút khi đang loading
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'} {/* Hiển thị trạng thái loading */}
          </button>
        </form>
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
  );
};

export default LoginPage;