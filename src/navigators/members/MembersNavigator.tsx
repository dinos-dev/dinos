import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import { SCREENS } from '../../constants/RoutePath';

const Stack = createNativeStackNavigator();
function MembersNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={SCREENS.MAP_SCREEN}
                component={MainTabNavigator}
                options={{
                    headerTitle: '', //뒤로가기에 이름 안보이게
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default MembersNavigator;
