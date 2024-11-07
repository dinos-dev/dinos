import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatZipListScreen from '../../../screens/matZipScreens/MatZipListScreen';
import { SCREENS } from '../../../constants/RoutePath';

const Stack = createNativeStackNavigator();
export default function MatZipSharedStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={SCREENS.MATZIP_LIST_SCREEN}
                component={MatZipListScreen}
            />
        </Stack.Navigator>
    );
}
