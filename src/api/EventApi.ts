import ClientApi from './ClientApi'

const EventApi = {
  getEvents: async (page: number, limit: number) => {
    try {
      const response = await ClientApi.get(`/events/all?page=${page}&limit=${limit}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get events', error)
    }
  },
  getEvent: async (eventID: number) => {
    try {
      const response = await ClientApi.get(`/events/all/${eventID}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get event', error)
    }
  },
  getEventCriteria: async (eventID: number) => {
    try {
      const response = await ClientApi.get(`/events/criteria/${eventID}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while getEventCriteria events', error)
    }
  },
  registerEvent: async (eventID: number) => {
    try {
      const response = await ClientApi.post(`/registrations/${eventID}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while registerEvent events', error)
    }
  },
  getEventByType: async (eventType: number, page: number, limit: number) => {
    try {
      const response = await ClientApi.get('/events/all/events-by-type', {
        params: {
          eventTypeId: eventType,
          page,
          limit
        }
      })
      console.log(response)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while getEventByType events', error)
    }
  }
}
export default EventApi
