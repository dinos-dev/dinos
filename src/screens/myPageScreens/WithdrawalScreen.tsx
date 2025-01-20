import React, { useState } from 'react'
import { Alert, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import CheckBox from '@react-native-community/checkbox' // 커뮤니티 체크박스
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NaviParams } from '../../constants/NaviParams'
import { UserRequest } from '../../services/user'
import useAuthStore from '../../store/authStore'
import { COLORS } from '../../constants/variables'
import AppText from '../../components/common/AppText'

function WithdrawalScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { logout } = useAuthStore()
  const [isChecked, setIsChecked] = useState(false)

  const handleWithdrawal = () => {
    if (!isChecked) {
      Alert.alert('탈퇴 동의에 체크해주세요.')
      return
    }
    Alert.alert(
      '회원탈퇴',
      '회원탈퇴를 하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            await UserRequest.Delete.withdrawal()
            Alert.alert('회원탈퇴가 완료되었습니다.')
            logout()
          },
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>회원탈퇴</AppText>
      <View style={styles.withdrawlContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox value={isChecked} onValueChange={setIsChecked} tintColors={{ true: '#FF6347', false: '#666' }} />
          <AppText style={styles.checkboxLabel}>
            탈퇴 시, 복구가 불가능하며 {'\n'}데이터가 삭제되는 것에 동의합니다.
          </AppText>
        </View>
        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          onPress={handleWithdrawal}
          disabled={!isChecked}
        >
          <AppText style={styles.buttonText}>탈퇴하기</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 50,
    color: COLORS.white,
  },
  withdrawlContainer: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 30,
    gap: 60,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: COLORS.dinosRed,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
  },
})

export default WithdrawalScreen
