import React from 'react'

function SideBar() {
    return (
        <div>
            <div className='h-15 text-center py-4'>
                <h2 className='text-2xl font-semibold'>E learn</h2>
            </div>
            <div>
                <ul className='flex flex-col px-2 my-7 gap-2'>
                    <li className='hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer'>Courses</li>
                    <li className='hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer'>Create Course</li>
                    <li className='hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer'>Profile</li>
                    <li className='hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer'>User Mangement</li>
                    <li className='hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer'>Track Progress</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
