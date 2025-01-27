import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyPageScreen from '../../../screens/myPageScreens/MyPageScreen'
import { SCREENS } from '../../../constants/RoutePath'
import ProfileScreen from '../../../screens/myPageScreens/ProfileScreen'
import WithdrawalScreen from '../../../screens/myPageScreens/WithdrawalScreen'

const Stack = createNativeStackNavigator()
export default function MyPageSharedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.MY_PAGE_SCREEN} component={MyPageScreen} />
      <Stack.Screen name={SCREENS.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={SCREENS.WITHDRAWAL_SCREEN} component={WithdrawalScreen} />
    </Stack.Navigator>
  )
}
