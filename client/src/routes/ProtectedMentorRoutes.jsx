import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedMentorRoutes() {
    const { isMentorAuth } = useSelector((state) => state.mentor)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMentorAuth) {
            navigate('/login')
        }
    })
    
    if (!isMentorAuth) {
        return null
    }
    
  return isMentorAuth && <Outlet />
}

export default ProtectedMentorRoutes
