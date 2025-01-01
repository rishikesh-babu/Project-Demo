import { RouterProvider } from "react-router"
import { router } from "./routes/routes"
import { Toaster } from "react-hot-toast"

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    )
}

export default App
