// import React, { useEffect, useState } from 'react'
// import _ from 'lodash'
// import ActivityCard from './ActivityCard'
// import { Tab, Tabs, Pagination, CircularProgress } from '@mui/material'
// import EventApi from '~/api/EventApi'

// interface ActivityTabProps {
//   page?: string
// }

// const ActivityTab: React.FC<ActivityTabProps> = ({ page }) => {
//   const [eventsData, setEventsData] = useState({
//     events: [],
//     totalPage: 0
//   })
//   const [currentPage, setCurrentPage] = useState(1)
//   const [limit] = useState(12)
//   const [value, setValue] = useState('one')
//   const [eventType, setEventType] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)

//   const getEventType = (tabValue) => {
//     switch (tabValue) {
//       case 'one':
//         return 1
//       case 'two':
//         return 2
//       case 'three':
//         return 3
//       default:
//         return 1
//     }
//   }

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//     const newEventType = getEventType(newValue)
//     setEventType(newEventType)
//     setCurrentPage(1)
//   }

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page)
//   }

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setIsLoading(true)
//       let data
//       if (page === 'mainpage') {
//         data = await EventApi.getEvents(currentPage - 1, limit)
//       } else {
//         data = await EventApi.getEventByType(eventType, currentPage - 1, limit)
//       }
//       if (data) {
//         setEventsData({
//           events: data.events || [],
//           totalPage: data.totalPage || 0
//         })
//       }
//       setIsLoading(false)
//     }
//     fetchEvents()
//   }, [page, eventType, currentPage, limit])

//   return (
//     <div
//       className='relative z-10 flex flex-col justify-center items-center
//      h-full px-4 md:px-16 lg:px-24 lg:mb-10 md:mb-6 sm:mb-10 pt-20'
//     >
//       <h1 className='text-2xl font-bold m-8 text-blue-900'>CÁC HOẠT ĐỘNG</h1>
//       {page === 'mainpage' ? null : (
//         <Tabs value={value} onChange={handleChange} aria-label='activity tabs'>
//           <Tab value='one' label='Hoạt động truyền thống' />
//           <Tab value='two' label='Hoạt động học thuật' />
//           <Tab value='three' label='Hoạt động liên chi đoàn' />
//         </Tabs>
//       )}

//       {isLoading ? (
//         <div className='min-h-screen'>
//           <CircularProgress sx={{ marginTop: '100px', display: 'block' }} />
//         </div>
//       ) : (
//         <div className='min-h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:w-4/5 md:w-[5/7] lg:w-[5/7]'>
//           {_.map(eventsData.events, (event) => (
//             <ActivityCard key={event.id} CardInfo={event} />
//           ))}
//         </div>
//       )}

//       <Pagination
//         count={eventsData.totalPage}
//         page={currentPage}
//         onChange={handlePageChange}
//         color='primary'
//         sx={{ marginTop: '16px' }}
//       />
//     </div>
//   )
// }

// export default ActivityTab
