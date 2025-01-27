import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapSharedStack from '../members/sharedStack/MapSharedStack'
import MyPageSharedStack from './sharedStack/MyPageSharedStack'
import MatZipSharedStack from './sharedStack/MatZipSharedStack'
import { View } from 'react-native'
import { DinoIcon, GalleryIcon, HeartIcon, HomeIcon, MapIcon } from '../../assets/icons/navBarIcon'
import { COLORS } from '../../constants/variables'
import GallerySharedStack from './sharedStack/GallerySharedStack'
import HomeSharedStack from './sharedStack/HomeSharedStack'

const Tab = createBottomTabNavigator()

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // 헤더를 표시하지 않음
        lazy: true, // 탭을 선택할 때 컴포넌트를 렌더링
        tabBarLabelStyle: { fontFamily: 'Pretendard-SemiBold' },
      }}
    >
      <Tab.Screen
        name="홈"
        component={HomeSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color }) => (
            <View>
              <HomeIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="맵"
        component={MapSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color }) => (
            <View>
              <MapIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="리스트"
        component={MatZipSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color }) => (
            <View>
              <HeartIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="갤러리"
        component={GallerySharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color }) => (
            <View>
              <GalleryIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="마이다이노"
        component={MyPageSharedStack}
        options={{
          headerTitle: '',
          headerShown: false,
          tabBarActiveTintColor: COLORS.dinosRed,
          tabBarInactiveTintColor: COLORS.deactivated,
          tabBarIcon: ({ color }) => (
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
