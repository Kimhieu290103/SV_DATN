import React from 'react'
import { Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ActivityTabsNavigation: React.FC = () => {
  const navigate = useNavigate()
  const [value, setValue] = React.useState('one')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)

    let eventTypeId: number
    switch (newValue) {
      case 'one':
        eventTypeId = 1
        break
      case 'two':
        eventTypeId = 2
        break
      case 'three':
        eventTypeId = 3
        break
      default:
        eventTypeId = 1
    }

    navigate(`/activities?eventTypeId=${eventTypeId}&page=0&limit=9`)
  }

  return (
    <Tabs value={value} onChange={handleChange} aria-label='activity tabs'>
      <Tab value='two' label='Hoạt động truyền thống' />
      <Tab value='three' label='Hoạt động học thuật' />
      <Tab value='one' label='Hoạt động liên chi đoàn' />
    </Tabs>
  )
}

export default ActivityTabsNavigation
