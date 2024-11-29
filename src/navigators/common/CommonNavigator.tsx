import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/common/LoginScreen'
import SignupScreen from '../../screens/common/SignupScreen'
import { SCREENS } from '../../constants/RoutePath'
import OnboardingScreen from '../../screens/common/OnboardingScreen'

export type CommonStackParamList = {
  [SCREENS.ONBOARDING_SCREEN]: undefined
  [SCREENS.LOGIN_SCREEN]: undefined
  [SCREENS.SIGNUP_SCREEN]: undefined
}

const Stack = createNativeStackNavigator<CommonStackParamList>()
function CommonNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.ONBOARDING_SCREEN} component={OnboardingScreen} />
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGNUP_SCREEN} component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default CommonNavigator
