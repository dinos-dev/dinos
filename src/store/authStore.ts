import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user: User) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default useAuthStore;
