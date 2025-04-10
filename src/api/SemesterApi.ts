import ClientApi from './ClientApi'
const SemesterApi = {
  getSemesters: async () => {
    try {
      const response = await ClientApi.get(`/semesters`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get criteria', error)
    }
  }
}
export default SemesterApi
