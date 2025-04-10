import ClientApi from './ClientApi'
const Criteria = {
  getCriteria: async () => {
    try {
      const response = await ClientApi.get(`/five_good/all`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log('error while get criteria', error)
    }
  }
}
export default Criteria
