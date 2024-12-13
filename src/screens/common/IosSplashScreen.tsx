import { Image, StyleSheet, View } from 'react-native'
import splash from '../../assets/image/splash.gif'
import { useEffect } from 'react'

interface IIosSplashScreen {
  setIsIosLoading: React.Dispatch<React.SetStateAction<boolean>>
}
function IosSplashScreen({ setIsIosLoading }: IIosSplashScreen) {
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsIosLoading(false)
    }, 2200)

    return () => {
      clearTimeout(splashTimer)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Image source={splash} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
})

export default IosSplashScreen
