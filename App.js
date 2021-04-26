import React from 'react'
import { StatusBar } from 'react-native'

import Navigation from './src/navigation/index'

import {AuthProvider} from './src/context/auth'

const App = () => {
  return (
    <>
      <StatusBar/>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </>
  )
}

export default App
