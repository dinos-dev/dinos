import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAccessToken = async () => {
  try {
    const storedData = await AsyncStorage.getItem('auth-storage')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const accessToken = parsedData.state?.user?.accessToken
      console.log('Access Token:', accessToken)
      return accessToken
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
      const refreshToken = parsedData.state?.user?.refreshToken
      console.log('Refresh Token:', refreshToken)
      return refreshToken
    }
  } catch (e) {
    console.error('Error retrieving refresh token:', e)
  }
  return null
}
