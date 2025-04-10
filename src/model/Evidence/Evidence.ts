export default interface Evidence {
  id: number
  user_id: number
  nameStudent: string
  name: string
  description: string
  date: string
  proofUrl: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  points: number
  studentName: string
  created_at: string
  clazz: string
  semester: string
}
