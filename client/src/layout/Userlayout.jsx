import React, { useEffect } from 'react';
import { Header } from '../components/user/Header'
import { Footer } from '../components/user/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, saveUserData } from '../redux/features/userSlice';
import UserHeader from '../components/user/UserHeader';

const Userlayout = () => {

    const { isUserAuth, userData } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        checkUser()
    }, [location.pathname])

    function checkUser() {
        axiosInstance({
            method: 'GET',
            url: '/user/check-user'
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(saveUserData(res.data.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
                dispatch(clearUserData())
            })
    }

    console.log('userData :>> ', userData);

    return (
        <div>
            {(isUserAuth && userData) ? <UserHeader /> : <Header />}
            <div className='min-h-96'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export { Userlayout }
