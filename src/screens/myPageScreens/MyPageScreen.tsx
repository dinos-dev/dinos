import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import AppButton from '../../components/common/AppButton'
import { COLORS } from '../../constants/variables'
import welcomeDino from '../../assets/image/welcomeDino.png'

function MyPageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { logout } = useAuthStore()

  const logoutHandler = async () => {
    await AuthRequest.Post.logout()
    logout()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSection}>
        <Image source={welcomeDino} />
      </View>
      <AppButton
        onPress={() => navigation.navigate(SCREENS.WITHDRAWAL_SCREEN)}
        style={styles.button}
        textStyle={styles.buttonText}
      >
        회원탈퇴
      </AppButton>
      <AppButton onPress={() => logoutHandler()} style={styles.button} textStyle={styles.buttonText}>
        로그아웃
      </AppButton>
    </SafeAreaView>
  )
}

export default MyPageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  imageSection: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: COLORS.dinosRed,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
