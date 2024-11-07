import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../../../screens/mapScreens/MapScreen';
import { SCREENS } from '../../../constants/RoutePath';

const Stack = createNativeStackNavigator();
export default function MapSharedStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.MAP_SCREEN} component={MapScreen} />
        </Stack.Navigator>
    );
}
