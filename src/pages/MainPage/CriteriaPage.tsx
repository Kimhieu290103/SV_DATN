// import React, { useEffect, useState } from 'react'
// import CriteriaApi from '~/api/CriteriaApi'
import hoctaptot from '~/assets/images/svg/hoctaptot.svg'
import hoinhaptot from '~/assets/images/svg/hoinhaptot.svg'
import daoductot from '~/assets/images/svg/daoductot.svg'
import tinhnguyentot from '~/assets/images/svg/tinhnguyentot.svg'
import theluctot from '~/assets/images/svg/theluctot.svg'
import imgArea from '~/assets/images/svg/content-area-star-bg-img.svg'
import imgArea2 from '~/assets/images/svg/content-area-star-bg-img-2.svg'

interface Props {
  propName?: string
}

const CriteriaPage: React.FC<Props> = () => {
  // const [data, setData] = useState([])
  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await CriteriaApi.getCriteria()
  //     setData(result)
  //     console.log('result', result)
  //   }
  //   getData()
  // }, [])
  return (
    <div className='block m-0 bg-[#f4f4f4] py-20 relative'>
      <img src={imgArea} className='absolute left-10 top-0' aria-hidden='true'></img>
      <h1 className='text-4xl font-bold text-blue-900 text-center mb-8'>Bộ Tiêu Chí 5 Tốt</h1>
      <p className='text-center text-xl text-blue-900 mb-8'>
        Dưới đây là bộ tiêu chí 5 Tốt tiêu biểu mà sinh viên đạt được khi tham gia các hoạt động của nhà trường.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-5  gap-4 xl:w-[1300px] lg:w-[900px] md:w-fit mx-auto'>
        <div
          className='flex flex-col p-4 text-blue-900
     items-center justify-items-start'
        >
          {/* do api thiếu icon cho criteria */}
          <img src={hoctaptot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>Học tập tốt</h3>
            <p className='text-center'>Có thành tích học tập tốt, điểm trung bình đạt loại khá trở lên.</p>
          </div>
        </div>
        <div
          className='flex flex-col p-4 text-blue-900 
   items-center justify-items-start '
        >
          <img src={theluctot} className='lg:w-24 lg:h-24 md:w-16 md:h-16 ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>Thể lực tốt</h3>
            <p className='text-center'>Thường xuyên rèn luyện thể dục thể thao, có sức khỏe tốt.</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900   items-center justify-items-start '>
          <img src={daoductot} className='lg:w-24 lg:h-24 md:w-16 md:h-16 ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>Phẩm chất tốt</h3>
            <p className='text-center'>Có phẩm chất đạo đức tốt, sống và làm việc theo pháp luật.</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900 items-center justify-items-start'>
          <img src={hoinhaptot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>Hội nhập tốt</h3>
            <p className='text-center'>Có kỹ năng mềm, ngoại ngữ, tin học tốt, tích cực hội nhập quốc tế.</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900   items-center justify-items-start'>
          <img src={tinhnguyentot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>Tình nguyện tốt</h3>
            <p className='text-center'>Tham gia các hoạt động tình nguyện, giúp đỡ cộng đồng.</p>
          </div>
        </div>
      </div>
      <img src={imgArea2} className='absolute right-10 bottom-5' aria-hidden='true'></img>
    </div>
  )
}

export default CriteriaPage
