import { SafeAreaView, StyleSheet } from 'react-native'
import AppText from '../common/AppText'

type PermissionModalPropsType = {
  description: string
}

function PermissionBackground({ description }: PermissionModalPropsType) {
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.description}>{description}</AppText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  description: {
    color: 'white',
    flex: 1,
    marginTop: 60,
    fontSize: 20,
    textAlign: 'center',
  },
})
export default PermissionBackground
