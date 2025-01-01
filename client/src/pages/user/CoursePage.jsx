import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import CourseCard from '../../components/user/CourseCard'
import ProductSkelton from '../../components/user/ProductSkelton'
import useFetch from '../../hooks/useFetch'

function CoursePage() {
    //     const [course, setCourse] = useState([])
    //     useEffect(() => {
    //         fetchCourses()
    //     }, [])

    //     function fetchCourses() {
    //         axiosInstance({
    //             method: 'GET',
    //             url: '/course/get-all-courses',
    //         })
    //             .then((res) => {
    //                 setCourse(res?.data?.data)
    //             })
    //             .catch((err) => {
    //                 console.log('err :>> ', err);
    //             })
    //     }

    const [course, isloading, err] = useFetch('/course/get-all-courses')
    console.log('course :>> ', course);
    

    return (
        <div className='flex justify-around'>
            {
                isloading ? (
                    <ProductSkelton />
                ) : (
                    course?.map((value, index) => <CourseCard course={value} key={value?.id || index} />)
                )
            }
        </div>
    )
}

export default CoursePage
