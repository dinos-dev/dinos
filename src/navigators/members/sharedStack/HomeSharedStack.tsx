import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREENS } from '../../../constants/RoutePath'
import HomeScreen from '../../../screens/homeScreen/HomeScreen'

const Stack = createNativeStackNavigator()
export default function HomeSharedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  )
}
