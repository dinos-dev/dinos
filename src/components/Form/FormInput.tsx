import React from 'react'
import { TextInput, Text, View, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Controller, Control, FieldValues, RegisterOptions } from 'react-hook-form'

// 컴포넌트에 전달될 프롭스의 타입을 정의
interface ICustomInputProps {
  label: string // 필드 라벨
  name: string // 필드 이름
  control: Control<FieldValues> // control 객체, 폼 상태를 관리
  rules?: RegisterOptions // 유효성 검사 규칙 (required, minLength 등)
  placeholder?: string // 인풋 필드의 placeholder
  inputStyle?: TextStyle // TextInput 컴포넌트 스타일
  labelStyle?: TextStyle // 라벨 텍스트 스타일
  containerStyle?: ViewStyle // 컨테이너(View) 스타일
  errorTextStyle?: TextStyle // 에러 메시지 스타일
}

// 커스텀 인풋 컴포넌트 정의
const CustomInput: React.FC<ICustomInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder,
  inputStyle,
  labelStyle,
  containerStyle,
  errorTextStyle,
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {/* 라벨 */}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Controller
        control={control} // useForm 훅에서 가져온 control 객체
        name={name} // 필드 이름
        rules={rules} // 유효성 검사 규칙
        render={({
          field: { onChange, onBlur, value }, // 필드에 필요한 핸들러와 현재 값
          fieldState: { error }, // 유효성 검사 상태 (에러가 있으면 에러 정보가 담김)
        }) => (
          <>
            {/* 실제 TextInput 필드 */}
            <TextInput
              style={[
                styles.input, // 기본 인풋 스타일
                inputStyle, // 외부에서 전달된 스타일 (있다면 적용)
                error ? styles.errorInput : null, // 에러가 있으면 에러 스타일 추가
              ]}
              placeholder={placeholder} // placeholder 값
              onBlur={onBlur} // 사용자가 인풋을 벗어났을 때 호출
              onChangeText={onChange} // 텍스트가 변경될 때 호출
              value={value} // 현재 인풋 필드의 값
            />

            {/* 에러가 있을 경우 에러 메시지를 표시 */}
            {error && (
              <Text style={[styles.errorText, errorTextStyle]}>
                {error.message} {/* 에러 메시지를 표시 (유효성 검사 실패 시) */}
              </Text>
            )}
          </>
        )}
      />
    </View>
  )
}

// 기본 스타일 정의
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
})

export default CustomInput
