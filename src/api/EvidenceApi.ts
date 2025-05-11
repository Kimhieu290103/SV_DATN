import ClientApi from './ClientApi'
const EvidenceApi = {
  SubmitMyEvent: async (payload: any) => {
    try {
      const response = await ClientApi.post('/external-events', payload)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while post my-events', error)
    }
  },
  getMyEvidenceList: async () => {
    try {
      const response = await ClientApi.get('/external-events/my-events')
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get my-events', error)
    }
  },
  createExternalEvent: async (formData: FormData) => {
    try {
      const response = await ClientApi.post('/external-events/create-externalevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while creating external event', error)
    }
  }
}
export default EvidenceApi
