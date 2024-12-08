import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface User {
  id: string
  name: string
  email: string
  authType: 'google' | 'naver' | 'apple'
  accessToken: string
  refreshToken: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateAccessToken: (newAccessToken: string) => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateAccessToken: (newAccessToken: string) => {
        const currentUser = get().user
        if (!currentUser) return
        const updatedUser = { ...currentUser, accessToken: newAccessToken } // 기존 값 유지하고 accessToken만 변경
        set({ user: updatedUser }) // 상태 업데이트
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useAuthStore
