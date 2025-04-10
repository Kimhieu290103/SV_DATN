import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Button, CardActions } from '@mui/material'
import Event from '~/model/Event/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import FormattedDate from '~/utils/FormattedDate'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'

interface CardProps {
  CardInfo: Event
}

const CardHeaderNoPadding = styled(CardHeader)(`
  padding-bottom: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

const ActivityCard: React.FC<CardProps> = ({ CardInfo }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className='flex flex-col justify-center items-center h-full sm:p-1 md:p-2 lg:p-2 xl:p-4 2xl:p-8'>
      {isLoading ? (
        <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />
      ) : (
        <Card
          className='w-full h-full'
          sx={{
            boxShadow: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6
            }
          }}
        >
          <CardMedia
            component='img'
            image={CardInfo?.eventImage[0]?.imageUrl || null}
            alt='Activity'
            sx={{
              height: '45%',
              aspectRatio: '3/2',
              objectFit: 'cover'
            }}
          />
          <div className='flex justify-between flex-col h-[55%]'>
            <CardHeaderNoPadding
              onClick={() => navigate(`/activity/${CardInfo.id}`)}
              avatar={
                <Avatar className='bg-amber-900' aria-label='recipe' sx={{ padding: '0px' }}>
                  R
                </Avatar>
              }
              title={CardInfo?.name}
              sx={{
                '& .MuiCardHeader-title': {
                  lineClamp: 2,
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '1rem',
                  color: '#1c398e',
                  '&:hover': { color: '#0a67af' },
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }
              }}
            />

            <CardContent className='w-full'>
              <div className='lg:pb-8 md:pb-4 sm:pb-1 border-b border-gray-100'>
                <Typography className='text-blue-900 line-clamp-2 text-base'>{CardInfo?.description}</Typography>
              </div>

              <div className='flex flex-row justify-between items-center mr-auto'>
                <div className='flex flex-row items-center mr-auto'>
                  <AccessTimeIcon />
                  <Typography className='text-gray-500 text-nowrap '>
                    <FormattedDate date={CardInfo?.date} hours={false} day={false}></FormattedDate>
                  </Typography>
                </div>
                <CardActions>
                  <Button
                    onClick={() => navigate(`/activity/${CardInfo.id}`)}
                    variant='outlined'
                    sx={{
                      backgroundColor: '#1c398e',
                      color: 'white',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: '#0a67af'
                      },
                      textWrap: 'nowrap'
                    }}
                    size='small'
                  >
                    Chi tiết
                  </Button>
                </CardActions>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ActivityCard
