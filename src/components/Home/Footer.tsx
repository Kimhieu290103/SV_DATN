import React from 'react'
import bigLogo from '~/assets/images/non-svg/logo.png'
import InstagramIcon from '~/assets/images/svg/icon_insta.svg'
import FacebookIcon from '~/assets/images/svg/icon_fb.svg'
import XIcon from '~/assets/images/svg/icon_twitter.svg'
import SmallIcon from '~/components/common/SmallIcon'

interface Props {
  propName?: string
}

const Footer: React.FC<Props> = () => {
  return (
    <div className='w-full  pb-8 sm:pb-8 lg:pb-12 bg-[#fafafa] '>
      <div className='mx-auto px-4 sm:px-6 lg:px-24 md:px-16'>
        <div className='w-full grid sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 border-b-gray-300 border-b'>
          <div className='col-span-2 p-4'>
            <img src={bigLogo} alt='Logo' />
            <p className='mt-2'>
              Cổng thông tin phục vụ cộng đồng và sinh viên 5 tốt được vận hành bởi Đoàn thanh niên trường Đại học Bách
              Khoa, Đại học Đà Nẵng
            </p>
          </div>

          <div className='p-4'>
            <ul className='space-y-2'>
              <li className='font-bold  text-blue-900'>Giới thiệu</li>
              <li>Đại học Bách Khoa Đà Nẵng</li>
              <li>54 - Nguyễn Lương Bằng - Liên Chiểu</li>
            </ul>
          </div>

          <div className='p-4'>
            <ul className='space-y-2'>
              <li className='font-bold  text-blue-900'>Liên kết</li>
              <li>Phòng Tổ chức - Hành chính </li>
              <li>Phòng Đào tạo</li>
              <li>Phòng Công tác sinh viên</li>
            </ul>
          </div>

          <div className='p-4'>
            <ul className='space-y-2'>
              <li className='font-bold  text-blue-900'>Liên hệ</li>

              <li>Hotline:012.345.6789 (9:AM to 8:PM)</li>
              <li>Email: dut@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='mx-auto sm:px-6 lg:px-24 md:px-16 mt-4  flex flex-row justify-between items-center '>
        <div>© Bản quyền Trường Đại học Bách khoa - Đại học Đà Nẵng</div>
        <div className='hidden sm:flex sm:flex-row'>
          <SmallIcon imageSource={InstagramIcon} />
          <SmallIcon imageSource={XIcon} />
          <SmallIcon imageSource={FacebookIcon} />
        </div>
      </div>
    </div>
  )
}

export default Footer
