import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapSharedStack from '../members/sharedStack/MapSharedStack'
import MyPageSharedStack from './sharedStack/MyPageSharedStack'
import MatZipSharedStack from './sharedStack/MatZipSharedStack'

const Tab = createBottomTabNavigator()

function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // 헤더를 표시하지 않음
                lazy: true, // 탭을 선택할 때 컴포넌트를 렌더링
            }}
        >
            <Tab.Screen
                name="홈"
                component={MapSharedStack}
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="맛집"
                component={MatZipSharedStack}
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="마이페이지"
                component={MyPageSharedStack}
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigator
