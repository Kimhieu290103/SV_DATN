import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { store } from '~/store/store';
import UserApi from '~/api/UserApi';

interface UpdateFormValues {
  phoneNumber: string;
  address: string;
  email: string;
}

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const user = store.getState().user;
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await UserApi.info(); // Gọi API info với user id
        setUserInfo(data);
      } catch (error) {
        console.error('Lỗi khi tải thông tin người dùng', error);
      }
    };

    if (user?.id) {
      fetchUserInfo();
    }
  }, [user?.id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormValues>();

  const onSubmit = async (data: UpdateFormValues) => {
    try {
      // Logic cập nhật thông tin (bạn có thể giữ nguyên hoặc tùy chỉnh)
      console.log('Thay đổi thông tin thành công', data);
      navigate('/');
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin', error);
    }
  };

  if (!userInfo) {
    return <div>Đang tải thông tin...</div>; // Hiển thị "Đang tải thông tin..." nếu chưa có dữ liệu
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'> {/* Đổi w-6/7 thành w-full */}
      <div className="grid grid-cols-2 gap-3 gap-x-20">
        {/* Tên đầy đủ */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Tên đầy đủ</label>
          <input
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.fullname}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
        </div>

        {/* MSSV */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>MSSV</label>
          <input
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.studentId ?? 'Mã số sinh viên'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
        </div>

        {/* Email cá nhân */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Email cá nhân</label>
          <input
            {...register('email')}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.email ?? 'Email cá nhân'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
          {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
        </div>

        {/* Số điện thoại cá nhân */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Số điện thoại cá nhân</label>
          <input
            {...register('phoneNumber')}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.phoneNumber ?? 'Số điện thoại'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
          {errors.phoneNumber && <p className='mt-1 text-sm text-red-600'>{errors.phoneNumber.message}</p>}
        </div>

        {/* Địa chỉ */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Địa chỉ</label>
          <input
            {...register('address')}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.address ?? 'Địa chỉ'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
          {errors.address && <p className='mt-1 text-sm text-red-600'>{errors.address.message}</p>}
        </div>

        {/* Lớp học */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Lớp</label>
          <input
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.clazz ?? 'Lớp học'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
        </div>

        {/* Khoa */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Khoa</label>
          <input
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.department ?? 'Khoa'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
        </div>

        {/* Ngày sinh */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Ngày sinh</label>
          <input
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900'
            required
            disabled
            defaultValue={userInfo?.dateOfBirth ?? 'Ngày sinh'}
            style={{ width: '100%' }} // Thêm inline style để đảm bảo chiều rộng
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;