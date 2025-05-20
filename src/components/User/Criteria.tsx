import React, { useEffect } from 'react';

interface Props {
  propName?: string;
}

const Criteria: React.FC<Props> = ({ propName }) => {
  // const [criteria, setCriteria] = useState<any[]>([]); // hoặc bạn định nghĩa kiểu riêng thay vì any[]

  useEffect(() => {
    // Ví dụ: load dữ liệu, xử lý khi component mount
    // setCriteria(...)
  }, []);

  return (
    <div>
      <h1>{propName}</h1>
    </div>
  );
};

export default Criteria;
