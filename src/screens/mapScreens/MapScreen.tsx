import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

function MapScreen() {
  const navigation = useNavigation()

  return (
    <>
      <Text>메인 지도</Text>
    </>
  )
}

export default MapScreen
