interface Semester {
  id: number
  name: string
}

interface SemesterSelectProps {
  semesters: Semester[]
  selectedSemester: number | null
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SemesterSelect: React.FC<SemesterSelectProps> = ({ semesters, selectedSemester, onChange }) => {
  return (
    <div className='ml-auto mb-4'>
      <label htmlFor='semester-select' className='mr-2 font-medium'>
        Chọn kỳ học:
      </label>
      <select id='semester-select' value={selectedSemester || ''} onChange={onChange} className='border rounded p-2'>
        {semesters.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SemesterSelect
