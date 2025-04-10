import React from 'react'

interface FormattedDateProps {
  date: string | Date
  hours: boolean
  day: boolean
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, hours, day }) => {
  const dateObj = new Date(date)

  const time = dateObj.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const weekday = dateObj.toLocaleDateString('vi-VN', {
    weekday: 'long'
  })

  const datePart = dateObj.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  let displayText = ''
  if (hours && day) {
    displayText = `${time} - ${weekday}, ${datePart}`
  } else if (hours && !day) {
    displayText = time
  } else if (!hours && day) {
    displayText = `${weekday}, ${datePart}`
  } else {
    displayText = datePart
  }

  return <span className='text-xs '>{displayText}</span>
}

export default FormattedDate
