import React, { useEffect, useState, useMemo } from 'react'
import { Button, Stack, styled, Typography, CircularProgress } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import EventApi from '~/api/EventApi'
import UserApi from '~/api/UserApi'
import Event from '~/model/Event/Event'
import EventCri from '~/model/Event/EventCri'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import moment from 'moment'
import FormattedDate from '~/utils/FormattedDate'
import { store } from '~/store/store'

interface ActivityDesProps {
  propName?: number
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800]
    })
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#0a67af',
    ...theme.applyStyles('dark', {
      backgroundColor: '#1c398e'
    })
  }
}))

const ActivityDes: React.FC<ActivityDesProps> = () => {
  const { id } = useParams<{ id: string }>()
  const [eventData, setEventData] = useState<Event | null>(null)
  const [registed, setRegisted] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true)
      try {
        const numericId = Number(id);
        if (isNaN(numericId)) {
          console.error('Invalid id:', id);
          setIsLoading(false);
          return;
        }
        const [eventResult, registedResult] = await Promise.all([
          EventApi.getEvent(numericId),
          UserApi.getRegistedEvents()
        ])
        setEventData(eventResult)
        setRegisted(registedResult || []) // fallback to empty array if registedResult is undefined
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  // const checkRegister = useMemo(() => {
  //   if (!eventData) return false
  //   return (registed || []).some((event) => event.id === eventData.id)
  // }, [registed, eventData])
  const checkRegister = useMemo(() => {
    if (!eventData?.id) return false
    return registed.some((event) => event.id === eventData.id)
  }, [registed, eventData])

  const handleRegister = async () => {
    if (!id) {
      console.error('Invalid id');
      return;
    }
    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error('Invalid id, not a number:', id);
      return;
    }
    try {
      await EventApi.registerEvent(numericId)
      const updatedRegisted = await UserApi.getRegistedEvents()
      setRegisted(updatedRegisted || [])
    } catch (error) {
      console.error('Failed to register event:', error)
    }
  }

  const handleUnregister = async () => {
    try {
      await UserApi.removeRegistedEvents(`${eventData?.id}`)
      const updatedRegisted = await UserApi.getRegistedEvents()
      setRegisted(updatedRegisted || [])
    } catch (error) {
      console.error('Failed to unregister event:', error)
    }
  }

  if (!eventData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularProgress />
      </div>
    )
  }

  const accessToken = store.getState().auth.accessToken
  const percentage =
    eventData.maxRegistrations > 0 ? (eventData.currentRegistrations / eventData.maxRegistrations) * 100 : 0
  const eventTypeId =
    eventData.eventType === 'Hoạt động liên chi đoàn'
      ? 3
      : eventData.eventType === 'Hoạt động truyền thống'
        ? 1
        : eventData.eventType === 'Hoạt động học thuật'
          ? 2
          : 1

  return (
    <div className='relative z-10 flex flex-col justify-items-start h-full min-h-screen items-center px-4 md:px-16 lg:px-24 m-auto py-20 bg-[#fbfaf6]'>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[80vh]'>
          <CircularProgress sx={{ display: 'block' }} />
        </div>
      ) : (
        <div className='flex flex-col md:flex-row w-full max-w-[1200px] gap-8 '>
          {/* Article Section */}
          <div className='flex flex-col w-full max-w-[800px] '>
            <div className='flex flex-row justify-between pb-8 w-full'>
              <Link to={`http://localhost:3000/activities?eventTypeId=${eventTypeId}&page=0&limit=10`}>
                <Typography variant='h6' sx={{ color: '#1c398e' }}>
                  {eventData.eventType}
                </Typography>
              </Link>
              <Typography>
                <FormattedDate date={eventData.date} hours={true} day={true} />
              </Typography>
            </div>
            <div className='flex flex-col w-full'>
              <div className='pb-4'>
                <Typography variant='h4' sx={{ color: '#1c398e' }}>
                  {eventData.name}
                </Typography>
              </div>
              <div className='flex flex-row justify-center items-center pb-4'>
                <img
                  className='w-full rounded-lg'
                    src={
                      Array.isArray(eventData.eventImage) && eventData.eventImage.length > 0
                        ? eventData.eventImage[0].imageUrl || "/favicon/sinh20vic3aan20bk.jpg"
                        : "/favicon/sinh20vic3aan20bk.jpg"
                    }

                  alt={eventData.name}
                />
              </div>
              <div>
                  <Typography sx={{ whiteSpace: 'pre-line' }}>
                    {eventData.description.replace(/\\n/g, '\n')}
                  </Typography>

              </div>
            </div>
          </div>
          {/* Side Information Section */}
          <div className=''>
            {accessToken && (
              <div className='flex flex-col w-full max-w-[330px] gap-4  top-20 sticky'>
                <Typography variant='body2'>
                  Đã đăng ký: {eventData.currentRegistrations} / {eventData.maxRegistrations}
                </Typography>
                <Stack sx={{ width: '100%' }}>
                  <BorderLinearProgress
                    variant='determinate'
                    value={percentage}
                    sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#1c398e' } }}
                  />
                </Stack>
                <div className='flex flex-col gap-2'>
                  <div>
                    <span className='font-bold text-blue-900'>Địa điểm:</span> {eventData.location}
                  </div>
                  <div>
                    <span className='font-bold text-blue-900'>Điểm phục vụ cộng đồng:</span> {eventData.score} điểm
                  </div>
                  <ol>
                    <span className='font-bold text-blue-900'>Các tiêu chí của sự kiện: </span>
                    {eventData.eventCriteria.eventCriteria.map((criteria: EventCri, index: number) => (
                      <li key={index}>
                        <span> - {criteria.name} </span>
                      </li>
                    ))}
                  </ol>
                  <div>
                    <span className='font-bold text-blue-900'>Ngày bắt đầu đăng ký:</span>{' '}
                    {moment(eventData.registrationStartDate).format('DD/MM/YYYY')}
                  </div>
                  <div>
                    <span className='font-bold text-blue-900'>Ngày kết thúc đăng ký:</span>{' '}
                    {moment(eventData.registrationEndDate).format('DD/MM/YYYY')}
                  </div>
                  <div>
                    <span className='font-bold text-blue-900'>Hoạt động diễn ra từ ngày:</span>{' '}
                    {moment(eventData.date).format('DD/MM/YYYY HH:mm')} đến ngày{' '}
                    {moment(eventData.endDate).format('DD/MM/YYYY HH:mm')}
                  </div>
                  <div>
                    <span className='font-bold text-blue-900'>Thông tin thêm:</span> {eventData.additionalInfo}
                  </div>
                  <div>
                    <span className='font-bold text-blue-900'>Điểm số:</span> {eventData.score}
                  </div>
                </div>
                <div>
                  {checkRegister ? (
                    moment().isAfter(eventData.registrationEndDate) ? (
                      <Button
                        variant="outlined"
                        disabled
                        sx={{
                          backgroundColor: '#ccc',
                          borderRadius: '8px',
                          color: 'black',
                        }}
                        size="small"
                      >
                        <span className="font-bold text-center p-0.5">Đã đăng ký</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{
                          backgroundColor: '#1c398e',
                          borderRadius: '8px',
                          '&:hover': { backgroundColor: '#0a67af' }
                        }}
                        size="small"
                        onClick={handleUnregister}
                      >
                        <span className="font-bold text-white text-center p-0.5">Hủy đăng ký</span>
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor:
                          moment().isAfter(eventData.registrationEndDate) ||
                            eventData.currentRegistrations >= eventData.maxRegistrations
                            ? '#ccc'
                            : '#1c398e',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor:
                            moment().isAfter(eventData.registrationEndDate) ||
                              eventData.currentRegistrations >= eventData.maxRegistrations
                              ? '#ccc'
                              : '#0a67af'
                        },
                        color:
                          moment().isAfter(eventData.registrationEndDate) ||
                            eventData.currentRegistrations >= eventData.maxRegistrations
                            ? 'black'
                            : 'white'
                      }}
                      size="small"
                      disabled={
                        moment().isAfter(eventData.registrationEndDate) ||
                        eventData.currentRegistrations >= eventData.maxRegistrations
                      }
                      onClick={handleRegister}
                    >
                      <span className="font-bold text-center p-0.5">
                        {moment().isBefore(eventData.registrationStartDate)
                          ? 'Chưa đến ngày đăng ký'
                          : moment().isAfter(eventData.registrationEndDate)
                            ? 'Hết hạn đăng ký'
                            : eventData.currentRegistrations >= eventData.maxRegistrations
                              ? 'Đã đủ số lượng'
                              : 'Đăng ký'}
                      </span>
                    </Button>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityDes
