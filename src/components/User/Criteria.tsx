import React, { useEffect } from 'react'

interface Props {
  propName?: string
}

const Criteria: React.FC<Props> = ({ propName }) => {
  const [setCriteria, criteria] = useEffect([])
  useEffect(() => {})
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default Criteria
