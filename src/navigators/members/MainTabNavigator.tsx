import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapSharedStack from '../members/sharedStack/MapSharedStack'
import MyPageSharedStack from './sharedStack/MyPageSharedStack'
import MatZipSharedStack from './sharedStack/MatZipSharedStack'
import { View } from 'react-native'
import { DinoIcon, GalleryIcon, HeartIcon, HomeIcon } from '../../assets/icons/navBarIcon'
import { COLORS } from '../../constants/variables'

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
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color, size }) => (
            <View>
              <HomeIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="찜"
        component={MatZipSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color, size }) => (
            <View>
              <HeartIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="갤러리"
        component={MyPageSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color, size }) => (
            <View>
              <GalleryIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="다이노"
        component={MyPageSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color, size }) => (
            <View>
              <DinoIcon fill={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
