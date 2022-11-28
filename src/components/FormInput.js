import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, Text, View } from 'react-native'
import { InputOutline, InputStandard } from 'react-native-input-outline'
import tw from 'twrnc'

const Input = <TextInput style={tw`bg-white p-2 rounded-b-md`} />

const FormInput = ({
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={tw`w-full mb-2`}>
          <Text style={tw`text-blue-200 mb-1 font-semibold`}>{label}</Text>
          <InputOutline
            activeColor={'#00897B'}
            inactiveColor={tw`bg-gray-200`}
            errorColor={tw`bg-rose-500`}
            style={tw`mt-8`}
            value={value}
            name={name}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            backgroundColor={tw`bg-white`}
            fontColor={tw`text-black`}
            // assistiveText="Help your users through confusing Inputs!"
            // error={error}
            error={!!errors[name]}
            autoCapitalize="none"
            trailingIcon={() => (
              <Ionicons
                name="terminal"
                size={20}
                color={error ? tw`bg-rose-500` : tw`bg-gray-200`}
              />
            )}
          />

          {/* <Input
            {...field}
            style={tw`w-full rounded-xl border-2`}
            error={!!errors[name]}
            {...otherProps}
          /> */}
          {errors[name] && (
            <Text style={tw`text-rose-500 align-stretch`}>
              {errors[name] ? errors[name].message : ''}
            </Text>
          )}
        </View>
      )}
    />
  )
}

export default FormInput
