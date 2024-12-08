import { TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import AppText from './AppText'

interface IAppButtonProps extends TouchableOpacityProps {
  children: React.ReactNode | React.ReactNode[]
  style?: ViewStyle
  textStyle?: TextStyle
}

// 사용 예시
// <AppButton style={{ backgroundColor: 'orange' }} textStyle={{ color: 'green' }}>
//   로그아웃
// </AppButton>

const AppButton: React.FC<IAppButtonProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={{ ...props.style }}>
      <AppText style={{ ...props.textStyle, textAlign: 'center' }}>{props.children}</AppText>
    </TouchableOpacity>
  )
}

export default AppButton
