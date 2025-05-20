import React, { useEffect, useState } from 'react'
import EvidenceList from '~/components/User/EvidenceList'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import Evidence from '~/model/Evidence/Evidence'
import EvidenceApi from '~/api/EvidenceApi'
import { CircularProgress } from '@mui/material'
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
    <div className='min-h-screen flex flex-col m-0 min-h-[280px] min-h-[280px mt-10] mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-100'>
      <div
        className='flex flex-row justify-start items-stretch 
        px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
        sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto rounded-2xl shadow-xl border border-gray-200 mt-20'
      >
        <SideNav />
        <MainContent
          title='Gửi minh chứng'
          decs='Những minh chứng về những hoạt động mà
         bạn đã tham gia hay những thành tích bạn đạt được'
        >
          {isLoading ? (
            <div className='flex justify-center py-10'>
              <CircularProgress />
            </div>
          ) : (
            <EvidenceList data={evidenceData ?? []} />
          )}
        </MainContent>
      </div>
    </div>
  )
}

export default UserActivity
