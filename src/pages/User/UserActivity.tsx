import React, { useEffect, useState } from 'react'
import EvidenceList from '~/components/User/EvidenceList'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import Evidence from '~/model/Evidence/Evidence'
import EvidenceApi from '~/api/EvidenceApi'

const UserActivity: React.FC = () => {
  const [evidenceData, setEvidenceData] = useState<Evidence[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getRegistedEvent = async () => {
      setIsLoading(true)

      try {
        const result = await EvidenceApi.getMyEvidenceList()
        setEvidenceData(result)
        console.log(evidenceData)
      } catch (error) {
        console.error('Failed to fetch registered events:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getRegistedEvent()
  }, [])

  return (
    <div className='min-h-screen flex flex-col m-0'>
      <div
        className='flex flex-row justify-start items-stretch 
        px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
        sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto'
      >
        <SideNav></SideNav>
        <MainContent
          title='Gửi minh chứng'
          decs='Những minh chứng về những hoạt động mà
         bạn đã tham gia hay những thành tích bạn đạt được'
        >
          <EvidenceList data={evidenceData} />
        </MainContent>
      </div>
    </div>
  )
}

export default UserActivity
