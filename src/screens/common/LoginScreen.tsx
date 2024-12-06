import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Platform,
} from 'react-native'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import useAuthStore from '../../store/authStore'
import { useAppleAuth, useGoogleAuth, useNaverAuth } from '../../hooks/socialLogin'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { Auth } from '../../services/auth'

function LoginScreen() {
  const { login } = useAuthStore()
  const { loginWithApple, loading: appleLoginLoading } = useAppleAuth()
  const { loginWithGoogle, loading: googleLoginLoading } = useGoogleAuth()
  const { loginWithNaver, loading: naverLoginLoading } = useNaverAuth()

  const loginTest = async () => {
    const res = await Auth.Post.signUp({ email: 'test@gmail.com', userName: 'test', authType: 'apple' })
    console.log('res : ', res.result)
    if (res) {
      login({
        email: 'test@gmail.com',
        id: 'test',
        name: 'test',
        authType: 'apple',
        accessToken: res.result.accessToken,
        refreshToken: res.result.refreshToken,
      })
      Alert.alert('로그인에 성공했습니다.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput autoFocus placeholder="이메일" />
        <TextInput placeholder="비밀번호" />
      </View>
      <Button title="테스트용 로그인" onPress={loginTest} />
      {Platform.OS === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{ width: '100%', height: 45 }}
          onPress={loginWithApple}
          // disabled={appleLoginLoading}
        />
      )}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginWithGoogle}
        // disabled={}
      />
      <TouchableOpacity style={styles.naver} onPress={loginWithNaver}>
        <Text style={styles.naverText}>네이버 로그인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
  naver: {
    backgroundColor: 'green',
    height: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverText: {
    color: 'white',
  },
})

export default LoginScreen
