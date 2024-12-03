import { getRefreshToken } from './../store/asynsStorage'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { handleApiError } from '../libs/apiErrorHandler'
import { getAccessToken } from '../store/asynsStorage'
import ErrorCode from '../constants/ErrorCode'
import Config from 'react-native-config'
import useAuthStore from '../store/authStore'
import { Alert } from 'react-native'

interface ErrorResponseData {
    errorCode?: string
    message?: string // 에러 메시지
    error?: string // 에러 세부 정보
}

const api = axios.create({
    baseURL: Config.API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const accessToken = await getAccessToken()
            // console.log('token : ', token);
            if (accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        } catch (error) {
            console.error('Error in request interceptor:', error)
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        console.log('interceptor=> error.response : ', error.response)

        if (error.response?.status === 401) {
            console.log('401 error detected. Attempting to refresh token.')

            const errorData = error.response.data as ErrorResponseData
            console.log('errorData : ', errorData)

            // error가 EXPIRED_TOKEN(ACCESS_TOKEN 만료)인 경우에만 토큰 재발급 시도
            if (errorData && errorData.error && errorData.error === ErrorCode.EXPIRED_TOKEN) {
                console.log('errorData.error :', errorData.error)
                console.log('------------accessToken 재발급 API 호출----------')

                try {
                    // 토큰 재발급을 위한 API 호출
                    const refreshToken = await getRefreshToken()
                    console.log('refreshToken : ', refreshToken)
                    const response = await axios({
                        method: 'post',
                        url: `${Config.API_BASE_URL}auth/token/access`,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refreshToken}`,
                        },
                        withCredentials: true,
                    })

                    console.log('response : ', response)

                    // 기존 요청을 새 토큰으로 재실행
                    console.log('------------기존 API 호출----------')
                    const { updateAccessToken } = useAuthStore.getState()
                    updateAccessToken(response.data.result)
                    return api({
                        ...error.config,
                        headers: {
                            ...error?.config?.headers,
                            Authorization: `Bearer ${response.data.result}`,
                        },
                    })
                } catch (refreshError) {
                    console.log('Token refresh failed:', refreshError)
                    Alert.alert('토근 갱신에 실패했습니다. 다시 로그인해주세요')
                    const { logout } = useAuthStore.getState()
                    logout()
                    return Promise.reject(refreshError)
                }
            } else if (errorData && errorData.error) {
                console.log('errorData.error :', errorData.error)
                Alert.alert('토근이 만료 되었습니다. 다시 로그인해주세요')
                const { logout } = useAuthStore.getState()
                logout()
                return Promise.reject(error)
            }
        }

        console.log('Error in response interceptor:', error)
        handleApiError(error, error?.config?.url || '')
        return Promise.reject(error)
    },
)

export default api
