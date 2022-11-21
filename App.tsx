// import 'react-native-gesture-handler'
import React from 'react'
import 'react-native-url-polyfill/auto'
// import { StatusBar } from 'expo-status-bar'
// import { SafeAreaView } from 'react-native'
// import tw from 'twrnc'
import Navigation from './src/navigation'

import { AppProvider } from './src/context/AppProvider'
import { AuthProvider } from './src/context/AuthProvider'

const App = () => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>
    <AppProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </AppProvider>
    // </SafeAreaView>
  )
}

export default App
