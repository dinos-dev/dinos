import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import useAuthStore from '../../store/authStore'

function MyPageScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
    const { logout } = useAuthStore()

    return (
        <View>
            <Text style={{ fontSize: 20 }}>마이페이지</Text>
            <Button title="프로필" onPress={() => navigation.navigate(SCREENS.PROFILE_SCREEN)} />
            <Button title="로그아웃" onPress={() => logout()} />
        </View>
    )
}

export default MyPageScreen
