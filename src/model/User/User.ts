export interface User {
  id: string | null
  fullname: string | null
  phoneNumber: string | null //number ?
  studentId: string | null
  address: string | null
  email: string | null
  dateOfBirth: Date | null
  username: string | null
  active: boolean | null
  //số điểm hd cộng đồng, đủ chuẩn 5 tốt chưa
}
