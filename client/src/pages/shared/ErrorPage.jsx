import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage({ rol = 'user' }) {

    const navigate = useNavigate()
    
    const url = {
        home: '/',
    }

    if (rol === 'mentor') {
        url.home = '/mentor/dashboard'
    }

    return (
        <div>
            <h1> 404 not found! </h1>
            <button onClick={() => navigate(url.home)}>Navigate to home page </button>
        </div>
    )
}

export default ErrorPage
