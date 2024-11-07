import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/common/LoginScreen';
import SignupScreen from '../../screens/common/SignupScreen';
import { SCREENS } from '../../constants/RoutePath';

const Stack = createNativeStackNavigator();
function CommonNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen
                name={SCREENS.SIGNUP_SCREEN}
                component={SignupScreen}
            />
        </Stack.Navigator>
    );
}

export default CommonNavigator;
