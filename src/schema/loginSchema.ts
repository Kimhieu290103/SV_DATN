import * as Yup from 'yup'
const loginSchema = Yup.object().shape({
  username: Yup.string().required('Hãy nhập username'),
  password: Yup.string().required('Password là bắt buộc').min(6, 'Password phải có ít nhất 6 ký tự')
})
export default loginSchema
