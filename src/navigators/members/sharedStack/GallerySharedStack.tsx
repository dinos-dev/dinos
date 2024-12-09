import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREENS } from '../../../constants/RoutePath'
import GalleryScreen from '../../../screens/galleryScreen/GalleryScreen'
const Stack = createNativeStackNavigator()
export default function GallerySharedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.GALLERY_SCREEN} component={GalleryScreen} />
    </Stack.Navigator>
  )
}
