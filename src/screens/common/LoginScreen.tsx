import { SafeAreaView, StyleSheet, View, Platform, Image } from 'react-native'
import useAuthStore from '../../store/authStore'
import { useAppleAuth, useGoogleAuth, useNaverAuth } from '../../hooks/socialLogin'
import { AuthRequest } from '../../services/auth'
import { COLORS } from '../../constants/variables'
import AppButton from '../../components/common/AppButton'
import { WelcomeText } from '../../assets/icons/TextSvg'
import AppText from '../../components/common/AppText'
import welcomeDino from '../../assets/image/welcomeDino.png'

function LoginScreen() {
  const { login } = useAuthStore()
  const { loginWithApple, loading: appleLoginLoading } = useAppleAuth()
  const { loginWithGoogle, loading: googleLoginLoading } = useGoogleAuth()
  const { loginWithNaver, loading: naverLoginLoading } = useNaverAuth()

  const loginTest = async () => {
    const res = await AuthRequest.Post.signUp({ email: 'test@gmail.com', userName: 'test', authType: 'apple' })
    console.log('res : ', res.result)
    if (res) {
      // login({
      //   email: 'test@gmail.com',
      //   id: 'test',
      //   name: 'test',
      //   authType: 'apple',
      //   accessToken: res.result.accessToken,
      //   refreshToken: res.result.refreshToken,
      // })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSection}>
        <Image source={welcomeDino} />
      </View>
      <View style={styles.loginSection}>
        <View style={styles.welcome}>
          <WelcomeText />
          <AppText style={styles.desc}>찜한 식당으로 보는 나의 식성, 다이노스입니다.</AppText>
        </View>
        <View style={styles.buttons}>
          {Platform.OS === 'ios' && (
            <AppButton
              style={[styles.buttonSize, styles.appleButton]}
              textStyle={[styles.buttonText, { color: 'white' }]}
              onPress={loginWithApple}
            >
              Apple 로그인
            </AppButton>
          )}
          <AppButton
            style={[styles.buttonSize, styles.googleButton]}
            textStyle={styles.buttonText}
            onPress={loginWithGoogle}
          >
            구글 로그인
          </AppButton>
          <AppButton
            style={[styles.buttonSize, styles.naverButton]}
            textStyle={styles.buttonText}
            onPress={loginWithNaver}
          >
            네이버 로그인
          </AppButton>
          {/* <AppButton
            style={[styles.buttonSize, styles.kakaoButton]}
            textStyle={styles.buttonText}
            onPress={loginWithNaver}
          >
            카카오 로그인
          </AppButton> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginSection: {
    flex: 0.8,
    justifyContent: 'space-between',
    paddingVertical: 45,
    paddingHorizontal: 28,
    backgroundColor: COLORS.dinosRed,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  welcome: {
    gap: 12,
  },
  desc: {
    color: 'white',
    fontSize: 10,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  buttonSize: {
    width: '100%',
    height: 45,
  },
  appleButton: {
    backgroundColor: 'black',
  },
  googleButton: {
    backgroundColor: 'white',
  },
  naverButton: {
    backgroundColor: '#00DE5A',
  },
  kakaoButton: {
    backgroundColor: '#FFFB00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
  },
})

export default LoginScreen
