import React, { useEffect,useState } from 'react'
import {
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  MenuItem
} from '@mui/material'
import Evidence from '~/model/Evidence/Evidence'
import EvidenceApi from '~/api/EvidenceApi'
import SemesterApi from '~/api/SemesterApi'
interface EvidenceListProps {
  data: Evidence[]
}

const EvidenceList: React.FC<EvidenceListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(data?.length / itemsPerPage)
  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [proofUrl, setProofUrl] = useState('')
  const [points, setPoints] = useState('')
 // const [semesterId, setSemesterId] = useState('')
  const [semesters, setSemesters] = useState([])
  const [selectedSemester, setSelectedSemester] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchSemesters = async () => {
      const data = await SemesterApi.getSemesters()
      if (data) {
        setSemesters(data)
      }
    }
    fetchSemesters()
  }, [])
  const handleSubmit = async () => {
    setIsLoading(true)
    const payload = {
      name,
      description,
      date,
      proof_url: proofUrl,
      points: Number(points),
      semester_id: Number(selectedSemester)
    }

    try {
      const response = await EvidenceApi.SubmitMyEvent(payload)
      console.log('Submit success:', response)
      // Reset form sau khi submit
      setName('')
      setDescription('')
      setDate('')
      setProofUrl('')
      setPoints('')
      setSelectedSemester('')
      handleClose()
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-3/4 p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold'>Danh sách minh chứng</h2>
        <div>
          <button onClick={handleOpen} className='bg-[#4F959D] text-white px-4 py-2 rounded mr-2'>
            Thêm mới
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[200px]'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border p-2'>TT</th>
                <th className='border p-2'>Thời điểm</th>
                <th className='border p-2'>Số điểm</th>
                <th className='border p-2'>Nguồn khai báo</th>
                <th className='border p-2'>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={item.status === 'APPROVED' ? 'bg-pink-100 border-l-4 border-red-500' : ''}
                  >
                    <td className='border p-2 text-center'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className='border p-2 text-center'>{item.date}</td>
                    <td className='border p-2 text-center'>
                      <a href='#' className='text-blue-500'>
                        {item.points}
                      </a>
                    </td>
                    <td className='border p-2 text-center text-ellipsis max-w-[150px] whitespace-nowrap overflow-hidden'>
                      <a href={item.proofUrl}>{item.proofUrl}</a>
                    </td>
                    <td
                      className={`border p-2 text-center ${
                        item.status === 'APPROVED'
                          ? 'text-green-500 border-black'
                          : item.status === 'REJECTED'
                            ? 'text-red-500 border-black'
                            : item.status === 'PENDING'
                              ? 'text-yellow-500 border-black'
                              : 'text-gray-500 border-black'
                      }`}
                    >
                      {item.status === 'APPROVED'
                        ? 'Được duyệt'
                        : item.status === 'REJECTED'
                          ? 'Bị từ chối'
                          : item.status === 'PENDING'
                            ? 'Đang chờ duyệt'
                            : 'Không xác định'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='border p-4 text-center text-gray-500'>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {data?.length > itemsPerPage && (
            <div className='mt-4 flex justify-between items-center'>
              <span>Tổng số: {data.length}</span>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                sx={{ marginTop: '16px' }}
              />
            </div>
          )}
        </>
      )}

      {/* Modal dialog */}
      <Dialog open={open} onClose={handleClose} sx={{
        '& .MuiDialog-paper': {
          minHeight: '70vh' // Cấu hình chiều cao tối thiểu của toàn bộ Dialog
           
        },
      }}>
        <DialogTitle>Thêm Minh Chứng Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Tên minh chứng'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Mô tả'
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Ngày (yyyy-mm-dd)"
            fullWidth
            type="date"  // Chuyển loại trường thành date picker
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,  // Đảm bảo nhãn luôn hiển thị ở trên khi có giá trị
            }}
          />
          <TextField
            margin='dense'
            label='Link chứng từ'
            fullWidth
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Số điểm'
            fullWidth
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
          {/* <TextField
            margin='dense'
            label='Kỳ học'
            fullWidth
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
          /> */}
          <TextField
            select
            label="Chọn kỳ học"
            fullWidth
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            margin="dense"
          >
            {semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EvidenceList
