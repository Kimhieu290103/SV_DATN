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
  getRegisteredEvents: async (userid: number, semesterId: number) => {
    try {
      const response = await ClientApi.get(`/registrations/register/${userid}`, {
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
  },
  info: async () => {
    try {
      const response = await ClientApi.get(`/users/info`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get getAttendedEvents', error)
    }
  },
  changePass: async (oldPassword: string, newPassword: string) => {
    try {
      const response = await ClientApi.post(`/users/change-password`, {
        oldPassword,
        newPassword,
      });
  
      if (response.status === 200) {
        return response.data;  // Xử lý dữ liệu trả về nếu cần
      }
    } catch (error) {
      console.log('Error while changing password:', error);
    }
  }
  

}
export default UserApi
