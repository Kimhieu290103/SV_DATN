import React from 'react'
import CounterCard from './CounterCard'
import socialIcon from '~/assets/images/svg/social.svg'
import phucvuIcon from '~/assets/images/svg/phucvu.svg'
import helpIcon from '~/assets/images/svg/help.svg'

import documentIcon from '~/assets/images/svg/document.svg'
import { Link } from 'react-router-dom'

interface Props {
  propName?: string
  onActivityClick?: () => void
  onStudentClick?: () => void
}

const Counter: React.FC<Props> = ({ propName, onActivityClick, onStudentClick }) => {
  return (
    <div className='px-4 md:px-16 lg:px-24 m-auto md:w-4/5 lg:w-4/5 sm:w-full z-10 relative bottom-15'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 shadow h-fit bg-white rounded-[64.8px] px-2'>
        <div onClick={onActivityClick} style={{ cursor: 'pointer' }}>
          <CounterCard image={socialIcon} description='Hoạt động' />
        </div>
        <div onClick={onStudentClick} style={{ cursor: 'pointer' }}>
          <CounterCard image={phucvuIcon} description='Sinh viên 5 tốt' />
        </div>
        <Link to='/user/activity-point'>
          <CounterCard image={helpIcon} description='Phục vụ cộng đồng' />
        </Link>
        <Link to='/user/submit-activity'>
          <CounterCard image={documentIcon} description='Nộp minh chứng' />
        </Link>
      </div>
    </div>
  )
}

export default Counter
