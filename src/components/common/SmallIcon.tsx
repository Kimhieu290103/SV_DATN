import React from 'react'

interface Props {
  imageSource?: string
}

const SmallIcon: React.FC<Props> = ({ imageSource }) => {
  return (
    <>
      {imageSource && (
        <img src={imageSource} alt='icon' className='w-8 h-8 lg:w-6 md:w-6 lg:h-6 md:h-6 sm:w-2 sm:h-2' />
      )}
    </>
  )
}

export default SmallIcon
