import semester from '../semester/semester'
import { EventCriteria } from './EventCriteria'
import EventImage from './EventImage'

export default interface Event {
  id: number
  name: string
  description: string
  date: string
  endDate: string
  registrationStartDate: string
  registrationEndDate: string
  user_id: number
  score: number
  maxRegistrations: number
  currentRegistrations: number
  location: string
  additionalInfo: string
  eventType: string
  semester: semester[]
  eventImage: EventImage[]
  eventCriteria: EventCriteria[]
}
