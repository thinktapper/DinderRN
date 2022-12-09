import React, { forwardRef, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
// import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, Text, View } from 'react-native'
import { InputOutline, InputStandard } from 'react-native-input-outline'
import tw from 'twrnc'

import { FieldError } from 'react-hook-form'

const FormInput = forwardRef((props, ref) => {
  const { label, error, ...inputProps } = props

  return (
    <View style={tw`w-full mt-8 mb-2`}>
      {label && <Text style={tw`text-gray-500 text-sm`}>{label}</Text>}
      <InputOutline ref={ref} autoCapitalize="none" {...inputProps} />
      <Text style={tw`text-rose-500 items-stretch`}>
        {error && error.message}
      </Text>
    </View>
  )
})

// const Input = <TextInput style={tw`bg-white p-2 rounded-b-md`} />

// const FormInput = (props) => {
//   const inputRef = useRef(null)
//   const {
//     field: { name, onBlur, onChange, value, placeholder },
//     form: { errors, touched, setFieldTouched },
//     ...inputProps
//   } = props

//   const hasError = errors[name] && touched[name]

//   return (
//     <>
//       <InputOutline
//         ref={inputRef}
//         activeColor={'#00897B'}
//         inactiveColor={tw`bg-gray-200`}
//         errorColor={tw`bg-rose-500`}
//         style={tw`mt-8`}
//         value={value}
//         name={name}
//         placeholder={placeholder}
//         onBlur={() => {
//           setFieldTouched(name)
//           onBlur(name)
//         }}
//         {...inputProps}
//         onChangeText={(text) => onChange(name, text)}
//         autoCorrect={false}
//         backgroundColor={tw`bg-white`}
//         fontColor={tw`text-black`}
//         // assistiveText="Help your users through confusing Inputs!"
//         error={hasError}
//         // error={!!errors[name]}
//         autoCapitalize="none"
//         trailingIcon={() => (
//           <Ionicons
//             name="terminal"
//             size={20}
//             color={hasError ? tw`bg-rose-500` : tw`bg-gray-200`}
//           />
//         )}
//       />
//       {hasError && (
//         <Text style={tw`text-rose-500 align-stretch`}>{errors[name]}</Text>
//       )}
//     </>
//   )
// }

// const FormInput = ({
//   name,
//   rules = {},
//   placeholder,
//   secureTextEntry,
//   label,
//   ...otherProps
// }) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext()

//   return (
//     <Controller
//       control={control}
//       defaultValue=""
//       name={name}
//       rules={rules}
//       render={({
//         field: { value, onChange, onBlur },
//         fieldState: { error },
//       }) => (
//         <View style={tw`w-full mb-2`}>
//           <Text style={tw`text-blue-200 mb-1 font-semibold`}>{label}</Text>
//           <InputOutline
//             activeColor={'#00897B'}
//             inactiveColor={tw`bg-gray-200`}
//             errorColor={tw`bg-rose-500`}
//             style={tw`mt-8`}
//             value={value}
//             name={name}
//             placeholder={placeholder}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             autoCorrect={false}
//             secureTextEntry={secureTextEntry}
//             backgroundColor={tw`bg-white`}
//             fontColor={tw`text-black`}
//             // assistiveText="Help your users through confusing Inputs!"
//             // error={error}
//             error={!!errors[name]}
//             autoCapitalize="none"
//             trailingIcon={() => (
//               <Ionicons
//                 name="terminal"
//                 size={20}
//                 color={error ? tw`bg-rose-500` : tw`bg-gray-200`}
//               />
//             )}
//           />

//           {/* <Input
//             {...field}
//             style={tw`w-full rounded-xl border-2`}
//             error={!!errors[name]}
//             {...otherProps}
//           /> */}
//           {errors[name] && (
//             <Text style={tw`text-rose-500 align-stretch`}>
//               {errors[name] ? errors[name].message : ''}
//             </Text>
//           )}
//         </View>
//       )}
//     />
//   )
// }

export default FormInput
