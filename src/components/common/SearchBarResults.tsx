import React from 'react'
import { Link } from 'react-router-dom'

interface SearchBarResultsProps {
  results: any[]
}

const SearchBarResults: React.FC<SearchBarResultsProps> = ({ results }) => {
  return (
    <div className='bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
      {results.length > 0 ? (
        results.map((result, index) => {
          console.log("Event ID in SearchBarResults:", result.id); // Thêm dòng này
          return (
            <Link
              to={`/activity/${result.id}`}
              key={index}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0'
              style={{ display: 'block' }}
            >
              <p className='text-sm text-blue-900'>
                {result.name || 'Unnamed Event'}
              </p>
            </Link>
          );
        })
      ) : (
        <div className='px-4 py-2 text-sm text-gray-500'>No results found</div>
      )}
    </div>
  );
};

export default SearchBarResults