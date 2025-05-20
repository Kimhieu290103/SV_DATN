import React from 'react'
import ActivityDes from '~/components/Home/ActivityDes'

interface Props {
  propName?: string
}

const ActivityPage: React.FC<Props> = () => {
  return (
    <div className='block m-0 '>
      <ActivityDes></ActivityDes>
    </div>
  )
}

export default ActivityPage
