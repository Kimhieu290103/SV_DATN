import axios from 'axios'
import { store } from '~/store/store'

const EvidenceApi = {
  SubmitMyEvent: async (payload: any) => {
    const token = store.getState().auth.accessToken
    try {
      const response = await axios.post('http://localhost:8080/api/external-events', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while post my-events', error)
    }
  },
  getMyEvidenceList: async () => {
    const token = store.getState().auth.accessToken
    try {
      const response = await axios.get('http://localhost:8080/api/external-events/my-events', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get my-events', error)
    }
  }
}
export default EvidenceApi
