import { Link, useNavigate } from "react-router-dom"
import Darkmode from "../shared/Darkmode"

const Header = () => {

    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between items-center w-full px-20 h-24 shadow-2xl">
                <Link to={'/'}>
                    <div className="flex items-center gap-5 text-3xl font-bold">
                        <div>
                            Course Selling
                        </div>

                    </div>
                </Link>
                <nav className="flex gap-16 items-center font-semibold">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/course'}>Course</Link>
                </nav>

                <div className="flex items-center gap-10">
                    <button onClick={() => navigate('/login')} className="btn btn-primary">Join us</button>
                    <Darkmode />
                </div>
            </div>
        </>
    )
}

export { Header }