import { Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput autoFocus placeholder="이메일" />
        <TextInput placeholder="비밀번호" />
      </View>
      <Button title="회원가입" />
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
})

export default SignupScreen
