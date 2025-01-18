import { getAccessToken } from "../utils/getAccessToken";
import { getRefreshToken } from "../utils/getRefreshToken";
import axios from "./axios";


export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true

})

// setting accesstoken in header
axiosPrivate.interceptors.request.use(
    async (config) => {
        if (!config.headers['Authorization']) {
            const accessToken = getAccessToken()
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    }, (error) => Promise.reject(error)

)

// setting accestoken if expires using refresh token

axiosPrivate.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;

        if (error.response?.status === 401 && !prevRequest.retry) {
            prevRequest.retry = true
            const newAccessToken = await getRefreshToken()
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
    }
)