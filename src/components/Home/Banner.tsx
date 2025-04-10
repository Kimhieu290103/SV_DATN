import React from 'react'
import banner from '~/assets/images/non-svg/banner3.jpeg'
interface Props {
  propName?: string
}

const Banner: React.FC<Props> = ({ propName }) => {
  return (
    <div className='relative h-screen text-white'>
      <div className='absolute inset-0 z-0'>
        <img src={banner} alt='Banner' className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.3)]'></div>
      </div>

      <div className='relative z-10 flex flex-col justify-center h-full px-4 md:px-16 lg:px-24 m-auto'>
        <div className='w-full flex flex-col justify-center items-center '>
          <div className='max-w-2xl'>
            <h1 className='text-4xl md:text-6xl font-bold mb-8 text-center'>Phục vụ cộng đồng và sinh viên 5 tốt</h1>
            <p className='text-lg md:text-xl mb-8 line-clamp-3 text-center text-gray-300 '>
              Cổng thông tin phục vụ cộng đồng của Trung tâm Dịch vụ Sinh viên, trường Đại học Bách khoa Đà Nẵng.
            </p>

            {/* Action Buttons 
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <button className='flex items-center bg-white  font-bold px-8 py-2 rounded-md hover:bg-opacity-80 transition-all'>
                <span className='text-center w-full text-black '>Hoạt động</span>
              </button>
              <button className='flex items-center  bg-white  font-bold bg-opacity-70 px-8 py-2 rounded-md hover:bg-opacity-40 transition-all'>
                <span className='text-center w-full text-black'>Sinh viên 5 tốt</span>
              </button>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
