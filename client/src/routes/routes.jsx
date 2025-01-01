import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Cart } from "../pages/user/Cart";
import { CourseDetailsPage } from "../pages/user/CourseDetailsPage";
import { Login } from "../pages/shared/Login";
import { Userlayout } from "../layout/Userlayout";
import Signup from "../pages/shared/Signup";
import ErrorPage from "../pages/shared/ErrorPage";
import CoursePage from "../pages/user/CoursePage";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfilePage from "../pages/user/ProfilePage";
import Mentorlayout from "../layout/Mentorlayout";
import ProtectedMentorRoutes from "./ProtectedMentorRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Userlayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'course',
                element: <CoursePage />
            },
            {
                path: 'coursePageDetail/:id',
                element: <CourseDetailsPage />,
            },
            {
                path: 'user',
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: 'whishlist',
                        element: <h1>whishlist</h1>
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    },
                    {
                        path: 'cart',
                        element: <Cart />
                    },
                    {
                        path: 'order',
                        element: <h1> Order page </h1>
                    },
                ]
            }
        ]
    },
    {
        path: 'mentor',
        element: <Mentorlayout />,
        errorElement: <ErrorPage rol="mentor" />,
        children: [
            {
                path: 'login',
                element: <Login role='mentor' />,
            },
            {
                path: '',
                element: <ProtectedMentorRoutes />,
                children: [
                    {
                        path: 'courses',
                    },
                    {
                        path: 'create-course',
                    },
                    {
                        path: 'profile',
                    },
                    {
                        path: 'track-progress',
                    },
                    {
                        path: 'user-data'
                    }
                ],
            },
        ]
    },

])
export { router }