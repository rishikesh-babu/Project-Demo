import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import axiosInstance from '../../config/axiosInstance'

function ButtonCart({ id }) {

    const [courseDetails, isloading, err] = useFetch(`/course/get-courseDetails/${id}`)

    function handleAddCart() {
        console.log('This is handle add to cart')
        axiosInstance({
            method: 'POST',
            url: '/cart/add-to-cart',
            data: { courseId: courseDetails?._id }
        })
            .then((res) => {
                console.log('res :>> ', res);
                toast.success(res?.data?.message || 'Course added to cart')
            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error(err?.response?.data?.message)
            })
    }

    return (
        <div>
            <button
                onClick={handleAddCart}
                className="btn btn-outline btn-success">
                Add to Cart
            </button>
        </div>
    )
}

function ButtonGoBack() {
    const navigate = useNavigate()
    function goBack() {
        navigate(-1)
    }
    return (
        <div>
            <button onClick={goBack} className="btn btn-outline btn-warning">
                Go Back
            </button>
        </div>
    )
}

export { ButtonCart, ButtonGoBack }
