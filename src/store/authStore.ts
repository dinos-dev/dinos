// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface User {
//   id: string
//   name: string
//   email: string
//   authType: 'google' | 'naver' | 'apple'
//   accessToken: string
//   refreshToken: string
// }

// interface AuthState {
//   user: User | null
//   isAuthenticated: boolean
//   login: (user: User) => void
//   logout: () => void
//   updateAccessToken: (newAccessToken: string) => void
// }

// const useAuthStore = create(
//   persist<AuthState>(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       login: (user: User) => set({ user, isAuthenticated: true }),
//       logout: () => set({ user: null, isAuthenticated: false }),
//       updateAccessToken: (newAccessToken: string) => {
//         const currentUser = get().user
//         if (!currentUser) return
//         const updatedUser = { ...currentUser, accessToken: newAccessToken } // 기존 값 유지하고 accessToken만 변경
//         set({ user: updatedUser }) // 상태 업데이트
//       },
//     }),
//     {
//       name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
//       storage: createJSONStorage(() => AsyncStorage),
//     },
//   ),
// )

// export default useAuthStore

import { GoogleSignin } from '@react-native-google-signin/google-signin'
// Apple과 Naver 관련 로그아웃 로직은 관련 패키지를 임포트해야 함
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
  updateAccessToken: (newAccessToken: string, authType: 'google' | 'apple' | 'naver') => void
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
      updateAccessToken: (newAccessToken: string, authType: 'google' | 'apple' | 'naver') => {
        const state = get()
        const currentUser = state[`${authType}User`]
        if (!currentUser) return
        set({
          ...state,
          [`${authType}User`]: { ...currentUser, accessToken: newAccessToken },
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useAuthStore
