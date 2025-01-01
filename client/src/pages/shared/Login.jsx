import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axiosInstance from "../../config/axiosInstance"
import { useNavigate } from "react-router-dom"

export const Login = ({ role='user' }) => {

    const [loginData, setLoginData] = useState({})
    const navigate = useNavigate()

    const user = {
        role: 'user',
        login_api: '/user/login',
        profile_router: '/',
        signup_router: '/signup'
    }

    if (role === 'mentor') {
        user.role = 'mentor',
        user.login_api = '/mentor/login',
        user.profile_router = '/mentor',
        user.signup_router = '/mentor/signup'
    }

    function handleChange(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
        console.log('loginData :>> ', loginData);
    }

    function handleLogin(event) {
        event.preventDefault()
        axiosInstance({
            method: 'post', 
            url: user.login_api,
            data: loginData
        })
        .then((res) => {
            console.log('res :>> ', res);
            navigate(user.profile_router)
            toast.success(res.data.message)
        })
        .catch((err) => {
            console.log('err.response.data.message :>> ', err.response.data.message);  
            toast.error(err.response.data.message)      
        })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now! {role} </h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a onClick={() => navigate(user.signup_router)} className="label-text-alt link link-hover">Singup ?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleLogin} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}