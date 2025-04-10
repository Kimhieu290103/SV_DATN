import React, { useRef } from 'react'
import Banner from '~/components/Home/Banner'
import Counter from '~/components/Home/Counter'
import ActivityNew from '~/components/Home/ActivityNew'
import CriteriaPage from './CriteriaPage'
import AllActivitiesPage from './AllActivitiesPage'

interface Props {
  propName?: string
}

const LandingPage: React.FC<Props> = ({ propName }) => {
  const activityNewRef = useRef<HTMLDivElement>(null)
  const criteriaRef = useRef<HTMLDivElement>(null)

  const scrollToActivityNew = () => {
    if (activityNewRef.current) {
      activityNewRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const scrollToCriteria = () => {
    if (criteriaRef.current) {
      criteriaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className='block m-0 scroll'>
      <Banner />
      <Counter onActivityClick={scrollToActivityNew} onStudentClick={scrollToCriteria} />
      <ActivityNew />
      <div ref={criteriaRef}>
        <CriteriaPage />
      </div>
      <div ref={activityNewRef}>
        <AllActivitiesPage />
      </div>
    </div>
  )
}

export default LandingPage
