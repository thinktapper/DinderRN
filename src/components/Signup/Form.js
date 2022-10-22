import React from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../lib/useAuth'
import { Input } from 'react-native-elements'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

const Form = () => {
  const { signIn, signUp } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const login = ({ email, password }) => signIn(email, password)
  const register = ({ email, password }) => signUp(email, password)

  return (
    <View>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} />}
        rules={{ required: true }}
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => <Input onBlur={onBlur} onChangeText={onChange} value={value} />}
        rules={{ required: true }}
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Login" onPress={handleSubmit(login)} />
      <Button title="Register" onPress={handleSubmit(register)} />
    </View>
  )
}
export default Form
