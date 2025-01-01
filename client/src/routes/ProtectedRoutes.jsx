import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoutes() {
    const { isUserAuth, userData } = useSelector((state) => state.user)
    const navigate = useNavigate()

    console.log('isUserAuth :>> ', isUserAuth);
    console.log('userData :>> ', userData);

    useEffect(() => {
        if (!isUserAuth || !userData) {
            toast.error('User is not authorized');
            navigate('/login');
        }
    }, [isUserAuth]);

    if (!isUserAuth) {
        return null; // Avoid rendering anything while redirecting
    }

    return (
        isUserAuth && <Outlet />
    )
}

export default ProtectedRoutes
