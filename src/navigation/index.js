import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthConsumer} from '../context/auth'

import MainScreen from '../screen/main/index'
import LoginScreen from '../screen/auth/login'
import SignupScreen from '../screen/auth/signup'

const Index = () => {
    const Stack = createStackNavigator();
    
    const {auth} = AuthConsumer()

    return (<NavigationContainer>
                {!auth?
                    <Stack.Navigator initialRouteName='Login' headerMode={false}>
                        <Stack.Screen name='Login' component={LoginScreen}/>
                        <Stack.Screen name='SignUp' component={SignupScreen}/>
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        <Stack.Screen name='Main' component={MainScreen}/>
                    </Stack.Navigator>
                }
            </NavigationContainer>
    )
}

export default Index

