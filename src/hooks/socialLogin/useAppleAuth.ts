import appleAuth from '@invertase/react-native-apple-authentication'
import { Alert } from 'react-native'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { Auth } from '../../services/auth'

export const useAppleAuth = () => {
  const { login } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const loginWithApple = async () => {
    setLoading(true)
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      console.log('appleAuthRequestResponse : ', appleAuthRequestResponse)
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)
      console.log('credentialState : ', credentialState)
      const { email, fullName, user } = appleAuthRequestResponse

      const name = `${fullName?.givenName ?? ''} ${fullName?.familyName ?? ''}`.trim()

      /**
       * @TODO
       * 개발용
       */
      const res = await Auth.Post.signUp({ email: 'test@gmail.com', userName: 'test', authType: 'apple' })
      if (res) {
        login({
          email: email ?? '',
          id: 'test',
          name: 'test',
          authType: 'apple',
          accessToken: res.result.accessToken,
          refreshToken: res.result.refreshToken,
        })
        Alert.alert('로그인에 성공했습니다.')
      }

      /**
       * @TODO
       * 실제 배포용
       */
      // if (credentialState === appleAuth.State.AUTHORIZED) {
      //     const { email, fullName, user } = appleAuthRequestResponse
      //     const name = `${fullName?.givenName ?? ''} ${fullName?.familyName ?? ''}`.trim()
      //     login({ email: email ?? '', id: user, name, authType: 'apple' })
      // } else {
      //     Alert.alert('로그인에 실패했습니다.')
      // }
    } catch (error) {
      // Alert.alert('Apple 로그인 중 문제가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { loginWithApple, loading }
}
