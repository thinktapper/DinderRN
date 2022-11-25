import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, Text, View } from 'react-native'
import tw from 'twrnc'

const Input = <TextInput style={tw`bg-white p-2 rounded-b-md`} />

const FormInput = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <View style={tw`w-full mb-2`}>
          <Text style={tw`text-blue-200 mb-1 font-semibold`}>{label}</Text>
          <Input
            {...field}
            style={tw`w-full rounded-xl border-2`}
            error={!!errors[name]}
            {...otherProps}
          />
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
