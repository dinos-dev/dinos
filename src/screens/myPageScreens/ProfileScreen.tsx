import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { NaviParams } from '../../constants/NaviParams'
import { SCREENS } from '../../constants/RoutePath'
import AppButton from '../../components/common/AppButton'
import AppText from '../../components/common/AppText'
import { COLORS } from '../../constants/variables'
import welcomeDino from '../../assets/image/welcomeDino.png'
import useAuthStore from '../../store/authStore'

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NaviParams>>()
  const { googleUser, appleUser, naverUser } = useAuthStore()

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>프로필</AppText>
      <View style={styles.profile}>
        <View style={styles.profileImg}>
          <Image source={welcomeDino} />
        </View>
        <AppText style={styles.name}>{googleUser?.name || appleUser?.name || naverUser?.name || '공룡'} 님</AppText>
        <AppText style={styles.email}>
          {googleUser?.email || appleUser?.email || naverUser?.email || 'abc@test.com'}
        </AppText>
      </View>
      <AppButton
        onPress={() => navigation.navigate(SCREENS.MY_PAGE_SCREEN)}
        style={styles.button}
        textStyle={styles.buttonText}
      >
        뒤로가기
      </AppButton>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: COLORS.dinosRed,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 45,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 13,
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    padding: 30,
    textAlign: 'center',
  },
  profile: {
    gap: 15,
    width: '70%',
  },
  profileImg: {
    borderWidth: 2,
    borderColor: '#888',
    padding: 30,
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    textAlign: 'center',
  },
})
