import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CONSTANT from './navigationConstant.json'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthConsumer} from '../context/auth'

import MainScreen from '../screen/main/index'
import LoginScreen from '../screen/auth/login'
import SignupScreen from '../screen/auth/signup'

import {verifyToken} from '../hooks/useAuth'

const Index = () => {
    const Stack = createStackNavigator()
    
    const {state, setAuth} = AuthConsumer()

    useEffect(()=>{
        const result = verifyToken().then(response=>setAuth(response))
    },[])

    return (<NavigationContainer>
                {!state.auth?
                    <Stack.Navigator initialRouteName='Login' headerMode={false}>
                        <Stack.Screen name={CONSTANT.Login} component={LoginScreen}/>
                        <Stack.Screen name={CONSTANT.SignUp} component={SignupScreen}/>
                    </Stack.Navigator>
                    :
                    <Stack.Navigator>
                        <Stack.Screen name={CONSTANT.Home} component={MainScreen}/>
                    </Stack.Navigator>
                }
            </NavigationContainer>
    )
}

export default Index

