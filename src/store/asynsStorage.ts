import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAccessToken = async () => {
  try {
    const storedData = await AsyncStorage.getItem('auth-storage')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      console.log('Parsed Data:', parsedData)

      const userTypes = ['appleUser', 'googleUser', 'naverUser']
      for (const userType of userTypes) {
        const userData = parsedData.state?.[userType]
        if (userData) {
          const accessToken = userData.accessToken
          console.log(`Access Token (${userType}):`, accessToken)
          return accessToken
        }
      }
    }
  } catch (e) {
    console.error('Error retrieving access token:', e)
  }
  return null
}

export const getRefreshToken = async () => {
  try {
    const storedData = await AsyncStorage.getItem('auth-storage')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const userTypes = ['appleUser', 'googleUser', 'naverUser']
      for (const userType of userTypes) {
        const userData = parsedData.state?.[userType]
        if (userData) {
          const refreshToken = userData.refreshToken
          console.log(`Refresh Token (${userType}):`, refreshToken)
          return refreshToken
        }
      }
    }
  } catch (e) {
    console.error('Error retrieving refresh token:', e)
  }
  return null
}
