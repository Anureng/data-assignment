import { useEffect, useState } from 'react';

interface Retreat {
    id: string;
    title: string;
    type: string;
    description: string;
    date: number;
    duration: number;
    price: number;
    location: string;
    image: string;
    tag: string[];
}

const Filter = () => {
    const [data, setData] = useState<Retreat[]>([]);
    const [filteredData, setFilteredData] = useState<Retreat[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
                const jsonData = await response.json();
                setData(jsonData);
                setFilteredData(jsonData);
            } catch (error) {
                alert('Please Reload The Page');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...data];

        if (search) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedTag) {
            filtered = filtered.filter((item) => item.tag.includes(selectedTag));
        }

        if (selectedDate) {
            const currentDate = new Date();
            if (selectedDate === '2023-2024') {
                filtered = filtered.filter((item) => new Date(item.date) < currentDate);
            } else if (selectedDate === '2024-2025') {
                filtered = filtered.filter((item) => new Date(item.date) >= currentDate);
            }
        }

        setFilteredData(filtered);
    }, [search, selectedTag, selectedDate, data]);

    const handlePageChange = (direction: string) => {
        if (direction === 'next' && currentPage * itemsPerPage < filteredData.length) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='p-5'>
            <div className='flex flex-col  sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
                <div className='flex  flex-col  w-full sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-3'>
                    <select
                        className='bg-[#1B3252] text-white w-full sm:w-36 sm:rounded-lg p-2 rounded-lg cursor-pointer'
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value=''>Filter by Date</option>
                        <option value='2023-2024'>2023-2024</option>
                        <option value='2024-2025'>2024-2025</option>
                    </select>
                    <select
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className='bg-[#1B3252] text-white w-full sm:w-36 p-2 rounded-md sm:rounded-lg cursor-pointer'>
                        <option value=''>Filter by Type</option>
                        <option value="yoga">Yoga</option>
                        <option value="meditation">Meditation</option>
                        <option value="detox">Detox</option>
                    </select>
                </div>
                <div className='bg-[#1B3252] text-white flex space-x-2 rounded-md sm:rounded-lg items-center justify-between w-full sm:w-2/5'>
                    <input
                        placeholder='Search retreats by title'
                        className='bg-transparent focus:outline-none p-2 sm:w-full '
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex items-center flex-col sm:flex-row justify-center '>
                {filteredData
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((el) => (
                        <div key={el.id} className='m-4 sm:w-2/4 w-full'>
                            <div className='bg-[#E0D9CF] p-2 rounded-lg shadow-lg'>
                                <img
                                    src={el.image}
                                    alt='Loading...'
                                    className='w-32 h-32 object-cover rounded-md'
                                />
                                <p className='text-xl mt-2'>{el.title}</p>
                                <div className='mt-2 font-light text-sm'>
                                    <p>{el.description}</p>
                                    <p>Date: {new Date(el.date).toUTCString()}</p>
                                    <p>Location: {el.location}</p>
                                    <p>Price: ${el.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className='space-x-5 flex items-center justify-center mt-4'>
                <button
                    className='bg-[#1B3252] text-white p-1 rounded-lg'
                    onClick={() => handlePageChange('prev')}
                >
                    Previous
                </button>
                <button
                    className='bg-[#1B3252] text-white p-1 rounded-lg'
                    onClick={() => handlePageChange('next')}
                >
                    Next
                </button>
            </div>
            <p className='flex items-center justify-center mt-12'>&copy; 2024 Wellness Retreats. All rights reserved</p>
        </div>
    );
};

export default Filter;
