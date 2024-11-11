import {
    Button,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { login } from '@react-native-kakao/user';
import { getKeyHashAndroid } from '@react-native-kakao/core';

function LoginScreen() {

    const kakaoLogin = async () => {
        try {
            const res = await login();
            console.log('res : ', res);
        } catch (e) {
            console.error(e);
        }
    }

    // 안드로이드 해시키 가져오기
    const getHash = async () => {
        getKeyHashAndroid().then(console.log);
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput autoFocus placeholder="이메일" />
                <TextInput placeholder="비밀번호" />
            </View>
            <Button title="로그인" />
            <Button title="카카오 로그인" onPress={kakaoLogin} />
        </SafeAreaView>
    );
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
});

export default LoginScreen;