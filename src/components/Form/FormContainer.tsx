import React from 'react'
import { View, ViewProps } from 'react-native'

interface IFormContainerProps extends ViewProps {
    children: React.ReactNode | React.ReactNode[]
}

const FormContainer: React.FC<IFormContainerProps> = ({ children, ...rest }) => {
    // ...rest: DivProps 타입의 나머지 props를 받아서 컴포넌트로 전달
    return <View {...rest}>{children}</View>
}

export default FormContainer
