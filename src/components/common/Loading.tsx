import { Box } from '@mui/material'

const dotStyle = {
  width: '12px',
  height: '12px',
  margin: '0 4px',
  backgroundColor: '#1976d2',
  borderRadius: '50%',
  display: 'inline-block',
  animation: 'dotPulse 1.4s infinite ease-in-out both'
}

const LoadingDots = () => {
  return (
    <>
      <style>
        {`
          @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>
      <Box className='flex justify-center items-center'>
        <span style={{ ...dotStyle, animationDelay: '0s' }} />
        <span style={{ ...dotStyle, animationDelay: '0.2s' }} />
        <span style={{ ...dotStyle, animationDelay: '0.4s' }} />
      </Box>
    </>
  )
}

export default LoadingDots
