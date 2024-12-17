import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox' // 커뮤니티 체크박스
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import { UserRequest } from '../../services/user'
import useAuthStore from '../../store/authStore'
import { COLORS } from '../../constants/variables'

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
            const res = await UserRequest.Delete.withdrawal()
            if (res) {
              Alert.alert('회원탈퇴가 완료되었습니다.')
              logout()
            }
          },
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(SCREENS.MY_PAGE_SCREEN)}>
        <Text style={styles.backButtonText}>뒤로가기</Text>
      </TouchableOpacity>
      <Text style={styles.title}>회원탈퇴</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} tintColors={{ true: '#FF6347', false: '#666' }} />
        <Text style={styles.checkboxLabel}>탈퇴 시, 복구가 불가능하며 {'\n'}데이터가 삭제되는 것에 동의합니다.</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, !isChecked && styles.buttonDisabled]}
        onPress={handleWithdrawal}
        disabled={!isChecked}
      >
        <Text style={styles.buttonText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.dark },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: { color: '#333', fontSize: 12 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 10,
    color: COLORS.white,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginLeft: 10, fontSize: 14, color: '#666' },
  button: { backgroundColor: COLORS.dinosRed, padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
})

export default WithdrawalScreen
