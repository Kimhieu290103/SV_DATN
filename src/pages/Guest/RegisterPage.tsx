
import { useState } from 'react'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone_number: '',
    student_id: '',
    address: '',
    date_of_birth: '',
    email: '',
    username: '',
    password: '',
    retype_password: '',
    class_id: '',
    role_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.retype_password) {
      alert('Mật khẩu không khớp!');
      return;
    }
    console.log('Dữ liệu đăng ký:', formData);
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-16'>
      <div className='w-full max-w-lg bg-white shadow-xl rounded-lg p-8'>
        <h1 className='text-3xl font-bold text-center text-blue-900'>Đăng ký</h1>
        <p className='text-gray-500 text-center mt-2'>Nhập thông tin để tạo tài khoản mới</p>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          {/* Họ và tên */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Họ và tên</label>
            <input
              type='text'
              name='fullname'
              placeholder='Họ và tên'
              className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900'
              onChange={handleChange}
              required
            />
          </div>

          {/* Mã số sinh viên & Số điện thoại */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mã sinh viên</label>
              <input
                type="text"
                name="student_id"
                placeholder="Mã sinh viên"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Số điện thoại"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={handleChange}
              required
            />
          </div>

          {/* Mật khẩu & Nhập lại mật khẩu */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
              <input
                type="password"
                name="retype_password"
                placeholder="Nhập lại mật khẩu"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={handleChange}
              required
            />
          </div>

          {/* Tên lớplớp */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Lớp sinh hoạt</label>
            <input
              type="text"
              name="class"
              placeholder="Tên lớp"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={handleChange}
              required
            />
          </div>
          {/* Ngày sinh */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              name="date_of_birth"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={handleChange}
              required
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Đăng ký
          </button>

          {/* Chuyển sang trang đăng nhập */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-900 hover:underline font-medium">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
