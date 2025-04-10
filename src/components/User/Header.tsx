import React from 'react'

const Header: React.FC = () => {
  return (
    <div className='flex  p-4 bg-white border-b border-gray-200'>
      <div className=' ml-auto'>
        <select
          className='appearance-none bg-white border border-gray-300 rounded px-4 
        py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500'
        >
          <option>Đợt chấm kỳ 1 năm 24-25</option>
          {/* Thêm các tùy chọn khác nếu cần */}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10 12l-6-6h12z' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Header
