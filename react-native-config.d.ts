declare module 'react-native-config' {
  export interface NativeConfig {
    MAPS_ANDROID_API_KEY: string
    MAPS_IOS_API_KEY: string
    MAPS_PLACES_API_KEY: string
    NAVER_CONSUMER_KEY: string
    NAVER_CONSUMER_SECRET: string
    GOOGLE_LOGIN_IOS: string
    GOOGLE_LOGIN_ANDROID: string
    API_BASE_URL: string
  }

  export const Config: NativeConfig
  export default Config
}
