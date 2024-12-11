import { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import Config from 'react-native-config'

export const useGoogleAuth = () => {
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_LOGIN_ANDROID,
      iosClientId: Config.GOOGLE_LOGIN_IOS,
      offlineAccess: true,
    })
  }, [])

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const userInfo = await GoogleSignin.signIn()
      console.log('userInfo : ', userInfo)
      if (userInfo.data) {
        const { email, id, name } = userInfo.data.user
        const res = await AuthRequest.Post.signUp({ email: email, userName: name || '사용자', authType: 'google' })
        if (res) {
          login(
            {
              email: email,
              id: id,
              name: name || '사용자',
              accessToken: res.result.accessToken,
              refreshToken: res.result.refreshToken,
            },
            'google',
          )
        }
      }
    } catch (error) {
      console.log('error : ', error)
    } finally {
      setLoading(false)
    }
  }

  return { loginWithGoogle, loading }
}
