import React, { useEffect, useState } from 'react'
import CriteriaApi from '~/api/CriteriaApi'
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

const CriteriaPage: React.FC<Props> = ({ propName }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const result = await CriteriaApi.getCriteria()
      setData(result)
      console.log('result', result)
    }
    getData()
  }, [])
  return (
    <div className='block m-0 bg-[#f4f4f4] py-20 relative'>
      <img src={imgArea} className='absolute left-10 top-0' aria-hidden='true'></img>
      <h1 className='text-4xl font-bold text-blue-900 text-center mb-8'>Bộ Tiêu Chí 5 Tốt</h1>
      <p className='text-center text-xl text-blue-900 mb-8'>
        Dưới đây là bộ tiêu chí 5 Tốt mà sinh viên cần đạt để tham gia các hoạt động của nhà trường.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-5  gap-4 xl:w-[1300px] lg:w-[900px] md:w-fit mx-auto'>
        <div
          className='flex flex-col p-4 text-blue-900
     items-center justify-items-start'
        >
          {/* do api thiếu icon cho criteria */}
          <img src={daoductot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>{data[0]?.name}</h3>
            <p className='text-center'>{data[0]?.description}</p>
          </div>
        </div>
        <div
          className='flex flex-col p-4 text-blue-900 
   items-center justify-items-start '
        >
          <img src={hoctaptot} className='lg:w-24 lg:h-24 md:w-16 md:h-16 ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>{data[1]?.name}</h3>
            <p className='text-center'>{data[1]?.description}</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900   items-center justify-items-start '>
          <img src={theluctot} className='lg:w-24 lg:h-24 md:w-16 md:h-16 ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>{data[2]?.name}</h3>
            <p className='text-center'>{data[2]?.description}</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900 items-center justify-items-start'>
          <img src={tinhnguyentot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>{data[3]?.name}</h3>
            <p className='text-center'>{data[3]?.description}</p>
          </div>
        </div>
        <div className='flex flex-col p-4 text-blue-900   items-center justify-items-start'>
          <img src={hoinhaptot} className='lg:w-24 lg:h-24 md:w-16 md:h-16  ' />
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-xl font-bold text-center  pb-2'>{data[4]?.name}</h3>
            <p className='text-center'>{data[4]?.description}</p>
          </div>
        </div>
      </div>
      <img src={imgArea2} className='absolute right-10 bottom-5' aria-hidden='true'></img>
    </div>
  )
}

export default CriteriaPage
