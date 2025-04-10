import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { store } from '~/store/store'

interface UpdateFormValues {
  phoneNumber: string
  address: string
  email: string
}

const ProfileForm: React.FC = () => {
  const navigate = useNavigate()
  const user = store.getState().user
  console.log(user)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateFormValues>()

  const onSubmit = async (data: UpdateFormValues) => {
    try {
      // Logic cập nhật thông tin (bạn có thể giữ nguyên hoặc tùy chỉnh)
      console.log('Thay đổi thông tin thành công')
      navigate('/')
    } catch (error) {
      console.log('error while updating', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-5/6'>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Tên đầy đủ</label>
        <input
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
          required
          disabled
          defaultValue={user?.fullname}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>MSSV</label>
        <input
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
          required
          disabled
          defaultValue={user?.studentId ?? 'Mã số sinh viên'}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Email cá nhân</label>
        <input
          {...register('email')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
          required
          disabled
          defaultValue={user?.email ?? 'Email cá nhân'}
        />
        {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Số điện thoại cá nhân</label>
        <input
          {...register('phoneNumber')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
          required
          disabled
          defaultValue={user?.phoneNumber ?? 'Số điện thoại'}
        />
        {errors.phoneNumber && <p className='mt-1 text-sm text-red-600'>{errors.phoneNumber.message}</p>}
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Địa chỉ</label>
        <input
          {...register('address')}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
          required
          disabled
          defaultValue={user?.address ?? 'Địa chỉ'}
        />
        {errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address.message}</p>}
      </div>
      {/* <button
        type='submit'
        className='w-fit bg-blue-900 hover:bg-blue-800 text-white
         font-bold py-2 px-4 rounded cursor-pointer mx-auto'
      >
        Xác nhận
      </button> */}
    </form>
  )
}

export default ProfileForm
