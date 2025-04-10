import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CircularProgress, Pagination } from '@mui/material'
import ActivityCard from '~/components/Home/ActivityCard'
import EventApi from '~/api/EventApi'

interface Event {
  id: number
  name: string
  date: string
  points: number
  proofUrl: string
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | string
}

interface EventsData {
  events: Event[]
  totalPage: number
}

const AllActivitiesPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const eventTypeId = Number(searchParams.get('eventTypeId')) || 1
  const pageParam = Number(searchParams.get('page')) || 0
  const limit = Number(searchParams.get('limit')) || 12

  const [currentPage, setCurrentPage] = useState(pageParam + 1)
  const [eventsData, setEventsData] = useState<EventsData>({ events: [], totalPage: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const data = await EventApi.getEvents(currentPage - 1, limit)
        setEventsData(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
      setIsLoading(false)
    }

    fetchEvents()
  }, [eventTypeId, currentPage, limit])

  return (
    <div
      className='relative z-10 flex flex-col justify-center items-center
     h-full px-4 md:px-16 lg:px-24 lg:mb-10 md:mb-6 sm:mb-10 pt-20 2xl:max-w-[1500px] 
     xl:max-w-[1200px] 
     mx-auto'
    >
      <h1 className='text-2xl font-bold my-4'>Danh sách Hoạt động</h1>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[200px]'>
          <CircularProgress />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
          {eventsData.events.map((event) => (
            <ActivityCard key={event.id} CardInfo={event} />
          ))}
        </div>
      )}
      {eventsData.totalPage > 1 && (
        <div className='mt-4 flex justify-between items-center'>
          <Pagination
            count={eventsData.totalPage}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
            sx={{ marginTop: '16px' }}
          />
        </div>
      )}
    </div>
  )
}

export default AllActivitiesPage
