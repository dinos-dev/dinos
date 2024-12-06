import { AxiosError } from 'axios'
import { errorMessages } from '../constants/ErrorMessages'
import { Alert } from 'react-native'

export const handleApiError = (error: AxiosError, apiUrl: string) => {
  const statusCode = error.response?.status
  const messages = errorMessages[apiUrl]

  if (messages && statusCode && messages[statusCode]) {
    Alert.alert(messages[statusCode])
  } else {
    // 기본 에러 처리
    Alert.alert(error.message || '알 수 없는 오류가 발생했습니다.')
  }
}
