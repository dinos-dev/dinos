import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import { UserRequest } from '../../services/user'
import AppButton from '../../components/common/AppButton'
import AppText from '../../components/common/AppText'
import { COLORS } from '../../constants/variables'

function MyPageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { logout } = useAuthStore()

  const logoutHandler = async () => {
    const res = await AuthRequest.Post.logout()
    if (res) {
      logout()
    }
  }

  return (
    <SafeAreaView>
      <AppText style={styles.title}>마이페이지</AppText>
      <AppButton onPress={()=>navigation.navigate(SCREENS.PROFILE_SCREEN)} style={styles.button} textStyle={styles.buttonText}>
        프로필
      </AppButton>
      <AppButton onPress={()=>navigation.navigate(SCREENS.WITHDRAWAL_SCREEN)} style={styles.button} textStyle={styles.buttonText}>
        회원탈퇴
      </AppButton>
      <AppButton onPress={()=>logoutHandler()} style={styles.button} textStyle={styles.buttonText}>
        로그아웃
      </AppButton>
    </SafeAreaView>
  )
}

export default MyPageScreen

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dinosRed,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})
