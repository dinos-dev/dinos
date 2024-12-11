import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, SafeAreaView, Text } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import useAuthStore from '../../store/authStore'
import { AuthRequest } from '../../services/auth'
import { UserRequest } from '../../services/user'

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
      <Text style={{ fontSize: 20 }}>마이페이지</Text>
      <Button title="프로필" onPress={() => navigation.navigate(SCREENS.PROFILE_SCREEN)} />
      <Button title="회원탈퇴" onPress={() => navigation.navigate(SCREENS.WITHDRAWAL_SCREEN)} />
      <Button title="로그아웃" onPress={logoutHandler} />
      <Button
        title="유저정보"
        onPress={async () => {
          const res = await UserRequest.Get.info()
          console.log('res : ', res)
        }}
      />
    </SafeAreaView>
  )
}

export default MyPageScreen
