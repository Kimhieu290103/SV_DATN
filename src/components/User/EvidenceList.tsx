import React, { useEffect, useState } from 'react'
import {
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  MenuItem,

} from '@mui/material'
import Evidence from '~/model/Evidence/Evidence'
import EvidenceApi from '~/api/EvidenceApi'
import SemesterApi from '~/api/SemesterApi'
interface EvidenceListProps {
  data: Evidence[]
}
interface Semester {
  id: string;
  name: string;
}
interface FormErrors {
  name?: string;
  date?: string;
  points?: string;
  selectedSemester?: string;
  proofFile?: string;
}

const EvidenceList: React.FC<EvidenceListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(data?.length / itemsPerPage)
  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const [open, setOpen] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [points, setPoints] = useState('')
  // const [semesterId, setSemesterId] = useState('')
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [errors, setErrors] = useState<{
    name?: string;
    date?: string;
    points?: string;
    selectedSemester?: string;
    proofFile?: string;
  }>({});
  useEffect(() => {
    const fetchSemesters = async () => {
      const data = await SemesterApi.getSemesters()
      if (data) {
        setSemesters(data)
      }
    }
    fetchSemesters()
  }, [])
  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors  = {};

    if (!name.trim()) {
      newErrors.name = 'Tên minh chứng không được để trống.';
      isValid = false;
    }

    if (!date) {
      newErrors.date = 'Vui lòng chọn ngày.';
      isValid = false;
    }

    if (!points.trim()) {
      newErrors.points = 'Số điểm không được để trống.';
      isValid = false;
    } else if (isNaN(Number(points))) {
      newErrors.points = 'Số điểm phải là một số.';
      isValid = false;
    }

    if (!selectedSemester) {
      newErrors.selectedSemester = 'Vui lòng chọn kỳ học.';
      isValid = false;
    }

    if (!proofFile) {
      newErrors.proofFile = 'Vui lòng chọn tệp minh chứng (.rar).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('points', points);
    formData.append('semesterId', selectedSemester);
    if (proofFile) {
      formData.append('file', proofFile);
    }

    try {
      const response = await EvidenceApi.createExternalEvent(formData);
      console.log('Submit success:', response);
      setName('');
      setDescription('');
      setDate('');
      setProofFile(null);
      setPoints('');
      setSelectedSemester('');
      setErrors({}); // Clear errors on successful submit
      handleClose();
    } catch (error) {
      console.error('Submit error:', error);
      // You might want to set a general error message here if the API call fails
    } finally {
      setIsLoading(false);
    }
  };
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = event.target;
  //   // Cập nhật state của trường
  //   if (name === 'name') setName(value);
  //   else if (name === 'description') setDescription(value);
  //   else if (name === 'date') setDate(value);
  //   else if (name === 'points') setPoints(value);
  //   else if (name === 'selectedSemester') setSelectedSemester(value);

  //   // Xóa thông báo lỗi cho trường đang được nhập
  //   setErrors(prevErrors => ({
  //     ...prevErrors,
  //     [name]: undefined,
  //   }));
  // };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setProofFile(file);
  //     // Xóa thông báo lỗi cho tệp khi chọn tệp mới
  //     setErrors(prevErrors => ({ ...prevErrors, proofFile: undefined }));
  //   }
  // };

  return (
    <div className='w-full overflow-x-auto p-4 min-h-[230px]'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-blue-900 '>Danh sách minh chứng</h2>
        <div>
          <button
            onClick={handleOpen}
            className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg 
    text-lg font-semibold shadow-md transition-all duration-300 
    hover:from-blue-600 hover:to-purple-700
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95'
          >
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
          <table className='w-full border-collapse rounded-sm overflow-hidden'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='border-0 border-blue-950 p-2 w-[100px]'>TT</th>
                <th className='border-0 border-blue-950 p-2 w-[200px]'>Thời điểm</th>
                <th className='border-0 border-blue-950 p-2 w-[150px]'>Số điểm</th>
                <th className='border-0 border-blue-950 p-2 w-[300px]'>Nguồn khai báo</th>
                <th className='border-0 border-blue-950 p-2 w-[150px]'>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}
                  >
                    <td className='border-0 p-2 text-center'>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className='border-0 p-2 text-center'>{item.date}</td>
                    <td className='border-0 p-2 text-center'>
                      <a href='#' className='text-blue-500'>
                        {item.points}
                      </a>
                    </td>
                    <td className="border-0 p-2 text-center text-ellipsis max-w-[150px] whitespace-nowrap overflow-hidden">
                      <a href={item.proofUrl} className="text-blue-500 hover:underline">
                        Xem minh chứng
                      </a>
                    </td>
                    <td
                      className={`border-0 p-2 text-center ${item.status === 'APPROVED'
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
                  <td colSpan={5} className='border-0 p-4 text-center text-gray-500 bg-gray-200'>
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
            // onChange={(e) => setName(e.target.value)}
            onChange={(e) => {
              setName(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, name: undefined }));
            }}
            error={!!errors.name}
            helperText={errors.name}
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
            // onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,  // Đảm bảo nhãn luôn hiển thị ở trên khi có giá trị
            }}
            error={!!errors.date}
            helperText={errors.date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, date: undefined }));
            }}
          />

          <TextField
            margin='dense'
            label='Số điểm'
            fullWidth
            value={points}
            // onChange={(e) => setPoints(e.target.value)}
            onChange={(e) => {
              setPoints(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, points: undefined }));
            }}
            error={!!errors.points}
            helperText={errors.points}
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
            // onChange={(e) => setSelectedSemester(e.target.value)}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, selectedSemester: undefined }));
            }}
            margin="dense"
            error={!!errors.selectedSemester}
            helperText={errors.selectedSemester}
          >
            {semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name}
              </MenuItem>
            ))}
          </TextField>
          <input
            accept=".rar"
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setProofFile(file)
                setErrors(prevErrors => ({ ...prevErrors, proofFile: undefined }));
              }
            }}
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span" className="bg-blue-800 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 mt-2">
              {proofFile ? proofFile.name : 'Chọn tệp'}
            </Button>
          </label>
          {/* {errors.proofFile && <FormHelperText error>{errors.proofFile}</FormHelperText>} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleSubmit} color='primary' variant='contained' disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EvidenceList
