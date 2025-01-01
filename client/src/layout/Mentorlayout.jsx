import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MentorHeader from '../components/mentor/MentorHeader'
import MentorFooter from '../components/mentor/MentorFooter'
import SideBar from '../components/mentor/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../config/axiosInstance'
import toast from 'react-hot-toast'
import { clearMentorData, saveMentorData } from '../redux/features/mentorSlice'

function Mentorlayout() {

    const { isMentorAuth, mentorData } = useSelector((state) => state.mentor)
    const { toggleSideBar } = useSelector((state) => state.sideBar)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log('isMentorAuth :>> ', isMentorAuth);
    console.log('mentorData :>> ', mentorData);

    useEffect(() => {
        checkMentor()
    }, [])

    function checkMentor() {
        axiosInstance({
            method: 'GET', 
            url: 'mentor/check-mentor'
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(saveMentorData(res?.data?.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error('Unauthorized mentor')
                dispatch(clearMentorData())
                navigate('/mentor/login')
            })
    }
    
    return (
        <div className='flex flex-row'>
            {(toggleSideBar && isMentorAuth) && (
                <div className='w-2/12 shadow-xl'>
                    <SideBar />
                </div>
            )}
            <div className='w-full'>
                <MentorHeader />
                <div className='min-h-96'>
                    <Outlet />
                </div>
                <MentorFooter />
            </div>
        </div>
    )
}

export default Mentorlayout
