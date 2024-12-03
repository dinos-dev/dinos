import { Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from 'react-native'
import { useEffect } from 'react'
import Config from 'react-native-config'
import { GoogleSignin, GoogleSigninButton, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin'
import NaverLogin from '@react-native-seoul/naver-login'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import useAuthStore from '../../store/authStore'
import { useAppleAuth } from '../../hooks/socialLogin'
import { Auth } from '../../services/auth'

const consumerKey = Config.NAVER_CONSUMER_KEY as string
const consumerSecret = Config.NAVER_CONSUMER_SECRET as string
const appName = 'dinos'
const serviceUrlSchemeIOS = 'naverlogin'

function LoginScreen() {
    const { login } = useAuthStore()
    const { loginWithApple, loading } = useAppleAuth()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Config.GOOGLE_LOGIN_ANDROID,
            iosClientId: Config.GOOGLE_LOGIN_IOS,
        })
        NaverLogin.initialize({
            appName,
            consumerKey,
            consumerSecret,
            serviceUrlSchemeIOS,
        })
    }, [])

    const loginWithGoogle = async () => {
        try {
            // const token = await GoogleSignin.getTokens()
            const userInfo = await GoogleSignin.signIn()
            if (userInfo.data) {
                const { email, id, name } = userInfo.data.user
                // login({ email, id, name: name || '', authType: 'google' })
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        Alert.alert('로그인이 진행중입니다.')
                        break
                    default:
                        Alert.alert('로그인 중 에러가 발생했습니다.')
                }
            } else {
                //구글에러가 아닌 경우
                Alert.alert('서버와 통신할 수 없습니다. 오프라인 상태인지 확인해주세요.')
            }
        }
    }

    const loginWithNaver = async () => {
        try {
            const { failureResponse, successResponse } = await NaverLogin.login()
            const token = successResponse
            if (token) {
                const userAccessToken = token!.accessToken
                const userInfo = await NaverLogin.getProfile(userAccessToken)
                console.log('네이버 로그인 응답 : ', userInfo)
                const { email, id, name } = userInfo.response
                // login({ email, id, name: name || '', authType: 'naver' })
            }
        } catch (error) {
            Alert.alert('로그인에 실패했습니다.')
        }
    }

    const loginTest = async () => {
        console.log('loginTest')
        const res = await Auth.Post.signUp({ email: 'test@gmail.com', userName: 'test', authType: 'apple' })
        console.log('res : ', res.result)
        if (res) {
            login({
                email: 'test@gmail.com',
                id: 'test',
                name: 'test',
                authType: 'apple',
                accessToken: res.result.accessToken,
                refreshToken: res.result.refreshToken,
            })
            Alert.alert('로그인에 성공했습니다.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput autoFocus placeholder="이메일" />
                <TextInput placeholder="비밀번호" />
            </View>
            <Button title="로그인" onPress={loginTest} />
            <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{ width: '100%', height: 45 }}
                onPress={loginWithApple}
                // disabled={loading}
            />
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={loginWithGoogle}
                // disabled={}
            />
            <TouchableOpacity style={styles.naver} onPress={loginWithNaver}>
                <Text style={styles.naverText}>네이버 로그인</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30,
    },
    naver: {
        backgroundColor: 'green',
        height: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    naverText: {
        color: 'white',
    },
})

export default LoginScreen
