import React from 'react'
import useFetch from '../../hooks/useFetch'
import axiosInstance from '../../config/axiosInstance'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUserData } from '../../redux/features/userSlice'
import toast from 'react-hot-toast'

function ProfilePage() {

    const [profile, isloading, error] = useFetch('/user/profile')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // if (error) {
    //     toast.error(error?.response?.data?.message)
    //     console.log('error.response.data.message :>> ', error.response.data.message);
    //     dispatch(clearUserData())
    //     navigate('/login')  
    //     return
    // }

    function Logout() {
        axiosInstance({
            method: 'PUT',
            url: '/user/logout'
        })
            .then((res) => {
                console.log('res :>> ', res);
                toast.success(res.data.message)
                navigate('/login')
            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error(err.response.data.message)
                navigate('/login')
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg shadow-lg max-w-xs w-full">
                {/* Avatar Section */}
                <div className="avatar online">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                        <img
                            src={profile?.profilePic || 'https://via.placeholder.com/150'}
                            alt={profile?.name || 'Profile Picture'}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Profile Information */}
                <h1 className="font-semibold">
                    Name: {profile?.name || 'Not Available'}
                </h1>

                {/* Mobile */}
                {profile?.mobile ? (
                    <p>Mobile: {profile?.mobile}</p>
                ) : (
                    <p>Mobile: Not Provided</p>
                )}
                <div>
                    <button onClick={Logout} className="btn btn-outline btn-accent">
                        Logout
                        <LogOut />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
