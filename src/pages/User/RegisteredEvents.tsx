import React, { useEffect, useState } from 'react'
import SemesterApi from '~/api/SemesterApi'
import UserApi from '~/api/UserApi'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'
import UserActivityContent from '~/components/User/UserActivityContent'
import Event from '~/model/Event/Event'
import { store } from '~/store/store'
import SemesterSelect from '~/components/User/SemeterSelect'
import semester from '~/model/semester/semester'
import { CircularProgress } from '@mui/material'

interface HomeProps {
  propName?: string
}

const ActivityPoint: React.FC<HomeProps> = ({ propName }) => {
  const userID = store.getState()?.user?.id

  const [events, setEvents] = useState<Event[]>([])
  const [semesters, setSemesters] = useState<semester[]>([])
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
  const [loadingEvents, setLoadingEvents] = useState<boolean>(false)

  useEffect(() => {
    const fetchSemesters = async () => {
      setLoadingEvents(true)
      try {
        const response = await SemesterApi.getSemesters()
        setSemesters(response)
        if (response.length > 0) {
          setSelectedSemester(response[0].id)
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách kỳ học:', error)
      } finally {
        setLoadingEvents(false)
      }
    }
    fetchSemesters()
  }, [])

  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(Number(event.target.value))
  }

  useEffect(() => {
    const fetchEvents = async () => {
      if (selectedSemester !== null) {
        setLoadingEvents(true)
        try {
          const result = await UserApi.getRegisteredEvents(userID, selectedSemester)
          setEvents(result)
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu hoạt động:', error)
        } finally {
          setLoadingEvents(false)
        }
      }
    }
    fetchEvents()
  }, [selectedSemester, userID])

  return (
    <div className='min-h-screen flex flex-col m-0 min-h-[280px mt-10] mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-100'>
      <div
        className='flex flex-row justify-start items-stretch 
          px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
          sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto rounded-2xl shadow-xl border border-gray-200 mt-20 mb-20'
      >
        <SideNav className="h-full"/>
        <MainContent className='flex-1 min-h-full' title='Phục vụ cộng đồng' decs='Thông tin về điểm phục vụ cộng đồng và sinh viên 5 tốt'>
          <SemesterSelect semesters={semesters} selectedSemester={selectedSemester} onChange={handleSemesterChange} />
          {loadingEvents ? (
            <div className='flex justify-center items-center w-full py-10'>
              <CircularProgress />
            </div>
          ) : (
            <UserActivityContent events={events} />
          )}  
        </MainContent>
      </div>
    </div>
  )
}

export default ActivityPoint
