import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"music-backend-weld.vercel.app/api",
    withCredentials:true
})