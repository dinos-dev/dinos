import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import RootNavigator from './navigators/root/RootNavigator'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './libs/react-query'
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native'
import IosSplashScreen from './screens/common/IosSplashScreen'

function App(): React.JSX.Element {
  const [isIosLoading, setIsIosLoading] = useState<boolean>(true)
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return Platform.OS === 'ios' && isIosLoading ? (
    <IosSplashScreen setIsIosLoading={setIsIosLoading} />
  ) : (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
