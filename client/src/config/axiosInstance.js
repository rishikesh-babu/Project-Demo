import { default as axios } from "axios";

console.log('import.meta.env.VITE_API_URL :>> ', import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true   // to access the cookies
})

export default axiosInstance