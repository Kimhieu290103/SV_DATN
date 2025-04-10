import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBarResults from './SearchBarResults'
import EventApi from '~/api/EventApi'

interface Props {
  isScrolled?: boolean
}

const SearchBar: React.FC<Props> = ({ isScrolled }) => {
  const location = useLocation()
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    const fetchResults = async () => {
      if (query && !isNaN(Number(query))) {
        const eventID = Number(query)
        const result = await EventApi.getEvent(eventID)
        if (result) {
          setResults([result])
        } else {
          setResults([])
        }
      } else {
        setResults([])
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className='relative lg:block sm:hidden md:hidden'>
      <input
        type='text'
        placeholder='Search by Event ID...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className={`w-48 px-4 py-2 rounded-lg ${
          isScrolled || location.pathname !== '/'
            ? 'bg-gray-100 text-blue-900 placeholder-blue-900 border-gray-300'
            : 'bg-white/20 backdrop-blur-sm text-white placeholder-gray-200 border-white/30'
        } border focus:border-blue-900 focus:outline-none transition-all`}
      />
      <button className='absolute right-3 top-2.5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`w-5 h-5 ${
            isScrolled || location.pathname !== '/' ? 'text-[var(--primary)]' : 'text-gray-200'
          } hover:text-blue-900 transition-colors`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </button>

      {isFocused && query && (
        <div className='absolute top-full left-0 right-0 mt-2 z-10'>
          <SearchBarResults results={results} />
        </div>
      )}
    </div>
  )
}

export default SearchBar
