import React from 'react'
import ActivityTable from './ActivityTable'
import Event from '~/model/Event/Event'

interface MainContentProps {
  events: Event[]
}

const UserActivityContent: React.FC<MainContentProps> = ({ events }) => {
  return (
    <div className='flex-1 '>
      <ActivityTable events={events} />
    </div>
  )
}

export default UserActivityContent
