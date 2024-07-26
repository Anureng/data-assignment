import React from 'react'

const Header = () => {
    return (
        <div className='p-6 hidden sm:block'>
            <div className='bg-[#E0D9CF] p-3 rounded-lg h-full shadow-lg'>
                <img
                    className='h-96 w-full object-cover rounded-xl'
                    src='https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Loading...'
                />
                <div className='mt-4 space-y-2'>
                    <p className='text-xl font-semibold'>Discover Your Inner Peace</p>
                    <p className='text-gray-700'>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation</p>
                </div>
            </div>
        </div>

    )
}

export default Header
