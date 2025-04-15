import ClientApi from './ClientApi'
const SemesterApi = {
    getDisciplinaryPoints: async () => {
    try {
      const response = await ClientApi.get(`/points/by-user`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get criteria', error)
    }
  }
}
export default SemesterApi
