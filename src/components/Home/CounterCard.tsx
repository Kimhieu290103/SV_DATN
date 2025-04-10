import React from 'react'

interface CounterCardProps {
  image: string
  description: string
}

const CounterCard: React.FC<CounterCardProps> = ({ image, description }) => {
  return (
    <div className='flex items-center justify-center  cursor-pointer md:p-4'>
      <img
        className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-18 2xl:h-18'
        src={image}
        alt={description}
      />
      <div className='flex flex-col items-center ml-4'>
        <span
          className='text-sm sm:text-base md:text-lg lg:text-xl 
        font-bold text-blue-950 line-clamp-2'
        >
          {description}
        </span>
      </div>
    </div>
  )
}

export default CounterCard
