// import React from 'react'

// interface PaginationProps {
//   currentPage: number
//   totalPages: number
//   onPageChange: (page: number) => void
// }

// const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers: (number | string)[] = []
//   const pagesToShow = 1

//   let startPage = Math.max(1, currentPage - pagesToShow)
//   let endPage = Math.min(totalPages, currentPage + pagesToShow)

//   if (currentPage - pagesToShow < 1) {
//     endPage = Math.min(totalPages, endPage + (pagesToShow - (currentPage - 1)))
//   }
//   if (currentPage + pagesToShow > totalPages) {
//     startPage = Math.max(1, startPage - (pagesToShow - (totalPages - currentPage)))
//   }

//   if (startPage > 1) {
//     pageNumbers.push(1)
//     if (startPage > 2) pageNumbers.push('...')
//   }

//   for (let i = startPage; i <= endPage; i++) {
//     // Sửa để bao gồm endPage
//     pageNumbers.push(i)
//   }

//   if (endPage < totalPages) {
//     if (endPage < totalPages - 1) pageNumbers.push('...')
//     pageNumbers.push(totalPages)
//   }

//   return (
//     <div className='flex flex-wrap justify-center lg:my-16 md:mt-10 md:mb-10 sm:mt-6 sm:mb-6'>
//       <button
//         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//         disabled={currentPage === 1}
//         className='mx-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300
//         disabled:opacity-50 disabled:cursor-not-allowed'
//       >
//         Prev
//       </button>

//       {pageNumbers.map((page, index) =>
//         page === '...' ? (
//           <span key={index} className='mx-1 px-3 py-1 rounded bg-gray-200'>
//             ...
//           </span>
//         ) : (
//           <button
//             key={index}
//             className={`mx-1 px-3 py-1 rounded ${
//               currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
//             }`}
//             onClick={() => onPageChange(page as number)}
//           >
//             {page}
//           </button>
//         )
//       )}

//       <button
//         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//         disabled={currentPage === totalPages} // Sửa điều kiện disable
//         className='mx-1 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
//       >
//         Next
//       </button>
//     </div>
//   )
// }

// export default PaginationComponent
