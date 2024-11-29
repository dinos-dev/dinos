export interface ISignUp {
    email: string
    userName: string | null
    authType: 'google' | 'kakao' | 'apple' | 'naver'
}
