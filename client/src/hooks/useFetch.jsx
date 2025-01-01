import React, { useEffect, useState } from 'react'
import axiosInstance from '../config/axiosInstance'

function useFetch(url) {

    const [data, setData] = useState(null)
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    console.log('url :>> ', url);

    useEffect(() => {
        fetchData()
    }, [url])

    function fetchData() {
        axiosInstance({
            method: 'GET',
            url: url,
        })
            .then((res) => {
                setData(res?.data?.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log('err :>> ', err);
                setError(err)
            })
            .finally(() =>{
                setIsLoading(false)
            })
    }

    return [data, isloading, error] 
}

export default useFetch
