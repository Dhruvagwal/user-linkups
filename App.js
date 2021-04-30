import React, {} from 'react'
import { StatusBar, Text, View } from 'react-native'

import Navigation from './src/navigation/index'

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import {AuthProvider} from './src/context/auth'


const App = () => {
  
  let [fontsLoaded] = useFonts({
      'Montserrat': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  if(!fontsLoaded){
    return <View>
      <Text>Loading..</Text>
    </View>
  }
  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'}/>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </>
  )
}

export default App
