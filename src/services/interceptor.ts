import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleApiError } from '../libs/apiErrorHandler'

// Axios 인스턴스 생성
const api = axios.create({
    // baseURL: process.env.API_BASE_URL,
    baseURL: 'https://dinos-apigw.p-e.kr/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: AxiosError) => void
}> = []

const processQueue = (token: string | null, error: AxiosError | null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token)
        } else {
            prom.reject(error!)
        }
    })
    failedQueue = []
}

// 요청 인터셉터
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('accessToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

// 응답 인터셉터
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
        if (!error.config) {
            return Promise.reject(error)
        }

        const statusCode = error.response?.status
        // if (statusCode === 401 && !originalRequest._retry) {
        //     if (isRefreshing) {
        //         return new Promise((resolve, reject) => {
        //             failedQueue.push({ resolve, reject })
        //         })
        //             .then((token) => {
        //                 if (originalRequest.headers) {
        //                     originalRequest.headers.Authorization = `Bearer ${token}`
        //                 }
        //                 return api(originalRequest)
        //             })
        //             .catch((err) => Promise.reject(err))
        //     }

        //     originalRequest._retry = true
        //     isRefreshing = true

        //     try {
        //         const refreshToken = await AsyncStorage.getItem('refreshToken')
        //         const response = await axios.post<{ accessToken: string }>('/auth/refresh', { refreshToken })
        //         const newToken = response.data.accessToken

        //         await AsyncStorage.setItem('accessToken', newToken)
        //         api.defaults.headers.Authorization = `Bearer ${newToken}`
        //         processQueue(newToken, null)
        //         isRefreshing = false

        //         if (originalRequest.headers) {
        //             originalRequest.headers.Authorization = `Bearer ${newToken}`
        //         }
        //         return api(originalRequest)
        //     } catch (refreshError) {
        //         processQueue(null, refreshError as AxiosError)
        //         isRefreshing = false
        //         return Promise.reject(refreshError)
        //     }
        // }

        handleApiError(error, error.config.url || '')
        return Promise.reject(error)
    },
)

export default api
