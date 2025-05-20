import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBarResults from './SearchBarResults'
import EventApi from '~/api/EventApi'
import Event from '~/model/Event/Event'
interface Props {
    isScrolled?: boolean
}

const SearchBar: React.FC<Props> = ({ isScrolled }) => {
    const location = useLocation()
    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<Event[]>([]) // Lưu trữ toàn bộ đối tượng sự kiện
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Thời gian chờ debounce (300ms)
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery) {
                try {
                    const searchData = await EventApi.searchEvents(debouncedQuery);
                    if (searchData && Array.isArray(searchData)) {
                        setResults(searchData); // Lưu trữ toàn bộ mảng đối tượng sự kiện
                    } else {
                        setResults([]);
                    }
                } catch (error) {
                    console.error('Lỗi khi tìm kiếm sự kiện:', error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    return (
        <div className='relative lg:block sm:hidden md:hidden'>
            <input
                type='text'
                placeholder='Tìm kiếm sự kiện...'
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

            {isFocused && debouncedQuery && results.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 z-10 bg-white shadow-md rounded-md'>
                    <SearchBarResults results={results} />
                </div>
            )}
            {isFocused && debouncedQuery && results.length === 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 z-10 bg-white shadow-md rounded-md p-2 text-gray-600'>
                    Không tìm thấy kết quả cho "{debouncedQuery}"
                </div>
            )}
        </div>
    )
}

export default SearchBar;