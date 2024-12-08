import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, SafeAreaView, Text } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import useAuthStore from '../../store/authStore'
import { UserRequest } from '../../services/user'

function MyPageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { logout } = useAuthStore()

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20 }}>마이페이지</Text>
      <Button title="프로필" onPress={() => navigation.navigate(SCREENS.PROFILE_SCREEN)} />
      <Button title="로그아웃" onPress={() => logout()} />
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
