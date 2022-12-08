import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
// import SocialSignInButtons from '../components/SocialSignInButtons'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/user/useUser'
import { useAuthContext } from '../context/AuthProvider'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const [loading, setLoading] = React.useState(false)
  const { control, handleSubmit, watch } = useForm()
  const pwd = watch('password')
  // const auth = useAuth()
  // const { user } = useUser()

  // if (user) {
  //   navigation.navigate('Home')
  // }

  const onRegisterPressed = async (data) => {
    if (loading) {
      return
    }
    const { password, username, email } = data
    // const username = data.username.toLowerCase()

    setLoading(true)
    try {
      // auth.signup(email, username, password)
      authContext.signup(email, username, password)
    } catch (e) {
      Alert.alert('Oops', e.message)
    }
    setLoading(false)
    // navigation.navigate('SignIn')
    // navigation.navigate('Home')
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        {/* <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        /> */}

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          autoCompleteType="username"
          capitalize="none"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          autoCompleteType="email"
          capitalize="none"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          autoCompleteType="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value) => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
})

export default SignUpScreen
