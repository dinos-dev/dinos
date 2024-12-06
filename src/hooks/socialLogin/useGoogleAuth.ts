import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import useAuthStore from '../../store/authStore'
import { Auth } from '../../services/auth'
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
      if (userInfo.data) {
        const { email, id, name } = userInfo.data.user
        const res = await Auth.Post.signUp({ email: email, userName: name || '', authType: 'google' })
        if (res) {
          login({
            email: email,
            id: id,
            name: name || '',
            authType: 'google',
            accessToken: res.result.accessToken,
            refreshToken: res.result.refreshToken,
          })
          Alert.alert('로그인에 성공했습니다.')
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
