import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import RootNavigator from './navigators/root/RootNavigator'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './libs/react-query'
import SplashScreen from 'react-native-splash-screen'

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000) //스플래시 스크린 숨기기
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
