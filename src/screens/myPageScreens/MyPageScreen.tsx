import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, SafeAreaView, Text } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import useAuthStore from '../../store/authStore'

function MyPageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { logout } = useAuthStore()

  const logoutHandler = async () => {
    //임시 로그아웃 핸들러
    await GoogleSignin.signOut() //구글
    //네이버
    // const res = await NaverLogin.logout()
    // const res1 = await NaverLogin.deleteToken()
    logout()
  }

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20 }}>마이페이지</Text>
      <Button title="프로필" onPress={() => navigation.navigate(SCREENS.PROFILE_SCREEN)} />
      <Button title="로그아웃" onPress={logoutHandler} />
    </SafeAreaView>
  )
}

export default MyPageScreen
