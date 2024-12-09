import { Text, TextProps, TextStyle } from 'react-native'

interface IAppTextProps extends TextProps {
  children: React.ReactNode | React.ReactNode[]
  style?: TextStyle | TextStyle[]
}

const AppText: React.FC<IAppTextProps> = (props) => {
  const convertFontWeight = () => {
    const fontWeight =
      props.style &&
      (Array.isArray(props.style)
        ? props.style.find((property) => property && 'fontWeight' in property)?.fontWeight
        : props.style.fontWeight)

    if (!fontWeight) return 'Medium'

    switch (fontWeight) {
      case 300:
        return 'Light'
      case 400:
        return 'Regular'
      case 500:
        return 'Medium'
      case 600:
        return 'SemiBold'
      case 700:
        return 'Bold'
      case 800:
        return 'ExtraBold'
    }
  }
  const fontWeight = convertFontWeight()
  return (
    <Text {...props} style={[props.style, { fontFamily: `Pretendard-${fontWeight}` }]}>
      {props.children}
    </Text>
  )
}

export default AppText
