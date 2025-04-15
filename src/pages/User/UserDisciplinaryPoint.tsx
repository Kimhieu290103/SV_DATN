import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material'
import { store } from '~/store/store'
import PointApi from '~/api/PointApi'
import MainContent from '~/components/User/MainContent'
import SideNav from '~/components/User/SideNav'

interface DisciplinaryPoint {
  semester: string
  points: number
}

const UserDisciplinaryPoint: React.FC = () => {
  const userID = store.getState()?.user?.id
  const [pointsList, setPointsList] = useState<DisciplinaryPoint[]>([])
  const [totalPoints, setTotalPoints] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchPoints = async () => {
      setLoading(true)
      try {
        const response = await PointApi.getDisciplinaryPoints()
        if (response?.disciplinaryPoints) {
          setPointsList(response.disciplinaryPoints)
          setTotalPoints(response.totalPoints)
        }
      } catch (error) {
        console.error('Lỗi khi lấy điểm rèn luyện:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPoints()
  }, [userID])

  return (
    <div className='min-h-screen flex flex-col m-0'>
      <div
        className='flex flex-row justify-start items-stretch 
          px-4 md:px-16 lg:px-24 py-20 bg-[#ffffff] w-full 
          sm:max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto'
      >
        <SideNav />
        <MainContent title='Điểm rèn luyện' decs='Tổng hợp điểm rèn luyện theo từng học kỳ'>
          {loading ? (
            <div className='flex justify-center items-center w-full py-10'>
              <CircularProgress />
            </div>
          ) : (
            <>
              {/* ✅ Tổng điểm */}
              <Box mb={4} p={2} bgcolor="#e3f2fd" borderRadius={2} textAlign="center">
                <Typography variant="h6" fontWeight="bold">
                  Tổng điểm rèn luyện: {totalPoints}
                </Typography>
              </Box>

              {/* ✅ Bảng hiển thị */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><strong>Kỳ học</strong></TableCell>
                      <TableCell align="center"><strong>Điểm rèn luyện</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pointsList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{item.semester}</TableCell>
                        <TableCell align="center">{item.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </MainContent>
      </div>
    </div>
  )
}

export default UserDisciplinaryPoint
