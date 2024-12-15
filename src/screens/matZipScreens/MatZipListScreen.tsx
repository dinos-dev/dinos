import { SafeAreaView, StyleSheet, View } from 'react-native'
import { DinoIcon } from '../../assets/icons/navBarIcon'
import AppText from '../../components/common/AppText'

function MatzipListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DinoIcon fill={'#000'} />
        <AppText>서비스 준비중입니다.</AppText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
})

export default MatzipListScreen
