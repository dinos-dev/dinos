import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import AppButton from '../../components/common/AppButton'
import AppText from '../../components/common/AppText'
import { COLORS } from '../../constants/variables'


const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()

  return (
    <SafeAreaView>
      <AppText style={styles.title}>프로필</AppText>
      <AppButton onPress={()=>navigation.navigate(SCREENS.MY_PAGE_SCREEN)} style={styles.button} textStyle={styles.buttonText}>
        뒤로가기
      </AppButton>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dinosRed,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})