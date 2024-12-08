import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import NaverLogin from '@react-native-seoul/naver-login'
import Config from 'react-native-config'
const consumerKey = Config.NAVER_CONSUMER_KEY
const consumerSecret = Config.NAVER_CONSUMER_SECRET
const appName = 'dinos'
const serviceUrlSchemeIOS = 'naverlogin'

export const useNaverAuth = () => {
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    NaverLogin.initialize({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlSchemeIOS,
    })
  }, [])

  const loginWithNaver = async () => {
    setLoading(true)
    try {
      const { successResponse } = await NaverLogin.login()
      const token = successResponse
      if (token) {
        const userAccessToken = token!.accessToken
        const userInfo = await NaverLogin.getProfile(userAccessToken)
        const { email, id, name } = userInfo.response
        const res = await AuthRequest.Post.signUp({ email: email, userName: name || '사용자', authType: 'naver' })
        if (res) {
          login({
            email: email,
            id: id,
            name: name || '사용자',
            authType: 'naver',
            accessToken: res.result.accessToken,
            refreshToken: res.result.refreshToken,
          })
        }
      }
    } catch (error) {
      console.log('error : ', error)
    } finally {
      setLoading(false)
    }
  }

  return { loginWithNaver, loading }
}
