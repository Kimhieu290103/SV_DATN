
import Event from '~/model/Event/Event'

interface ActivityTableProps {
  events: Event[]
}

const ActivityTable: React.FC<ActivityTableProps> = ({ events }) => {

  return (
    <div className='overflow-x-auto min-h-[180px]'>
      <h2 className='text-xl font-bold mb-4 text-blue-900'>Danh sách hoạt động</h2>
      <table className='w-full border-collapse text-sm md:text-base rounded-sm overflow-hidden '>
        <thead>
          <tr className=' border-0 bg-blue-500 text-white'>
            <th className='border-0 p-2 text-left border-blue-950 text-nowrap w-[300px]'>Tên hoạt động</th>
            {/* <th className='border p-2 text-left border-blue-950 text-nowrap'>Mô tả</th> */}
            <th className='border-0 p-2 text-left border-blue-950 text-nowrap  w-[200px]'>Bắt đầu</th>
            <th className='border-0 p-2 text-left border-blue-950 text-nowrap  w-[200px]'>Kết thúc</th>
            <th className='border-0 p-2 text-left border-blue-950 text-nowrap w-[200px]'>Địa điểm</th>
            <th className='border-0 p-2 text-left border-blue-950 text-nowrap w-[80px]'>Điểm</th>
            {/* <th className='border p-2 text-left border-blue-950 text-nowrap'>Kỳ</th> */}
          </tr>
        </thead>
        <tbody> 
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <tr key={event.id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                <td className='border-0 p-2'>{event.name}</td>
                {/* <td className='border p-2'>{event.description}</td> */}
                <td className='border-0 p-2'>{new Date(event.date).toLocaleDateString()}</td>
                <td className='border-0 p-2'>{new Date(event.endDate).toLocaleDateString()}</td>
                <td className='border-0 p-2'>{event.location}</td>
                <td className='border-0 p-2'>{event.score}</td>
                {/* <td className='border p-2'>{event.semester?.name || 'N/A'}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className='border-0 p-4 text-center text-gray-500 bg-gray-200'>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {fiveGood ? (
        <div className='mt-10'>
          <span>Bạn đã hoàn thành cả 5 tiêu chí</span>
        </div>
      ) : (
        <span>Bạn đang thiếu tiêu chí</span>
      )} */}
    </div>
  )
}

export default ActivityTable
