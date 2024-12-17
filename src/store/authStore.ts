import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NaverLogin from '@react-native-seoul/naver-login'

interface User {
  id: string
  name: string
  email: string
  accessToken: string
  refreshToken: string
}

interface AuthState {
  googleUser: User | null
  appleUser: User | null
  naverUser: User | null
  isAuthenticated: boolean
  login: (user: User, authType: 'google' | 'apple' | 'naver') => void
  logout: () => Promise<void>
  updateAccessToken: (newAccessToken: string) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      googleUser: null,
      appleUser: null,
      naverUser: null,
      isAuthenticated: false,
      login: (user: User, authType: 'google' | 'apple' | 'naver') => {
        const state = get()
        set({
          ...state,
          [`${authType}User`]: user,
          isAuthenticated: true,
        })
      },
      logout: async () => {
        const state = get()
        console.log('state: ', state)
        try {
          if (state.googleUser) {
            await GoogleSignin.signOut()
          } else if (state.naverUser) {
            await NaverLogin.logout()
          }
        } catch (error) {
          console.error(`로그아웃 중 에러 발생:`, error)
        } finally {
          set({
            ...state,
            googleUser: null,
            naverUser: null,
            appleUser: state.appleUser,
            isAuthenticated: false,
          })
        }
      },
      // updateAccessToken: (newAccessToken: string, authType: 'google' | 'apple' | 'naver') => {
      //   const state = get()
      //   const currentUser = state[`${authType}User`]
      //   if (!currentUser) return
      //   set({
      //     ...state,
      //     [`${authType}User`]: { ...currentUser, accessToken: newAccessToken },
      //   })
      // },
      updateAccessToken: (newAccessToken: string) => {
        const state = get()
        const { googleUser, appleUser, naverUser } = state

        if (googleUser) {
          set({
            ...state,
            googleUser: { ...googleUser, accessToken: newAccessToken },
          })
        } else if (appleUser) {
          set({
            ...state,
            appleUser: { ...appleUser, accessToken: newAccessToken },
          })
        } else if (naverUser) {
          set({
            ...state,
            naverUser: { ...naverUser, accessToken: newAccessToken },
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useAuthStore
