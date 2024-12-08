import { SafeAreaView, StyleSheet, View } from 'react-native'
import { SCREENS } from '../../constants/RoutePath'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CommonStackParamList } from '../../navigators/common/CommonNavigator'
import { COLORS } from '../../constants/variables'
import AppButton from '../../components/common/AppButton'
import AppText from '../../components/common/AppText'

type AuthHomeScreenProps = NativeStackScreenProps<CommonStackParamList>

function OnboardingScreen({ navigation }: AuthHomeScreenProps) {
  const moveToLoginPage = () => {
    navigation.navigate(SCREENS.LOGIN_SCREEN)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.description}>
        <View>
          <AppText style={styles.bigText}>새로운</AppText>
          <AppText style={styles.bigText}>식생활의 시대!</AppText>
        </View>
        <View>
          <AppText style={styles.smallText}>식당을 저장할 수 있는 다이노스에서</AppText>
          <AppText style={styles.smallText}>당신의 식성을 파악해보세요.</AppText>
        </View>
      </View>
      <AppButton onPress={moveToLoginPage} style={styles.button} textStyle={styles.buttonText}>
        다이노스 시작하기
      </AppButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  description: {
    flex: 1,
    gap: 10,
    margin: 30,
  },
  bigText: {
    fontSize: 32,
    fontWeight: 600,
    color: COLORS.white,
  },
  smallText: {
    fontSize: 12,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.dinosRed,
    height: 45,
    marginBottom: 35,
    marginHorizontal: 28,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 600,
  },
})

export default OnboardingScreen
