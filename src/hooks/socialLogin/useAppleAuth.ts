import appleAuth from '@invertase/react-native-apple-authentication'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import { Alert } from 'react-native'

export const useAppleAuth = () => {
  const { login, appleUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const loginWithApple = async () => {
    setLoading(true)
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      // console.log('appleAuthRequestResponse : ', appleAuthRequestResponse)
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
      const { email, fullName, user } = appleAuthRequestResponse

      /**
       * @TODO
       * 개발용도는 아래 코드 주석
       */
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        Alert.alert('로그인에 실패했습니다.')
        return
      }
      console.log('appleUser :', appleUser)

      if (appleUser) {
        console.log('appleUser :', appleUser)
        const res = await AuthRequest.Post.signUp({
          email: appleUser.email,
          userName: appleUser.name,
          authType: 'apple',
        })
        console.log('AuthRequest.Post.signUp res : ', res)
        if (res) {
          login(
            {
              email: appleUser.email,
              id: appleUser.id,
              name: appleUser.name,
              accessToken: res.result.accessToken,
              refreshToken: res.result.refreshToken,
            },
            'apple',
          )
        }
      } else {
        const name = `${fullName?.givenName ?? ''} ${fullName?.familyName ?? ''}`.trim()
        const res = await AuthRequest.Post.signUp({
          email: email ?? 'test@gmail.com',
          userName: name || '사용자',
          authType: 'apple',
        })
        console.log('AuthRequest.Post.signUp res : ', res)
        if (res) {
          login(
            {
              email: email ?? 'test@gmail.com',
              id: user,
              name: name || '사용자',
              accessToken: res.result.accessToken,
              refreshToken: res.result.refreshToken,
            },
            'apple',
          )
        }
      }
    } catch (error) {
      // Alert.alert('Apple 로그인 중 문제가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { loginWithApple, loading }
}
