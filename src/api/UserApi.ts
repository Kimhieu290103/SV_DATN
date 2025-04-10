import ClientApi from './ClientApi'
const UserApi = {
  getRegistedEvents: async () => {
    try {
      const response = await ClientApi.get('/registrations/user/getevents')
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get getRegistedEvents', error)
    }
  },
  RemoveRegistedEvents: async (eventID: string) => {
    try {
      const response = await ClientApi.delete(`/registrations/${eventID}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get getRegistedEvents', error)
    }
  },
  getAttendedEvents: async (userid: number, semesterId: number) => {
    try {
      const response = await ClientApi.get(`/registrations/attended/${userid}`, {
        params: { semesterId }
      })
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get getAttendedEvents', error)
    }
  },
  checkFiveGood: async (userid: number) => {
    try {
      const response = await ClientApi.get(`/student_criteria/check/${userid}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get getAttendedEvents', error)
    }
  }
}
export default UserApi
