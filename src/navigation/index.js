import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CONSTANT from './navigationConstant.json'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthConsumer} from '../context/auth'

import MainScreen from '../screen/main/index'
import LoginScreen from '../screen/auth/login'
import SignupScreen from '../screen/auth/signup'
import LoadingScreen from '../screen/Loading'

import { verifyToken } from '../hooks/useAuth'

const Index = () => {
    const Stack = createStackNavigator()
    
    const {state, setAuth} = AuthConsumer()

    const [Loading, setLoading] = useState(true)

    useEffect(()=>{
        const result = verifyToken().then(response=>{setAuth(response); setLoading(false)})
    },[])

    return (<NavigationContainer>
                {!state.auth?
                    <Stack.Navigator headerMode={false}>
                        {Loading && <Stack.Screen name={CONSTANT.Loading} component={LoadingScreen}/>}
                        <Stack.Screen name={CONSTANT.Login} component={LoginScreen}/>
                        <Stack.Screen name={CONSTANT.SignUp} component={SignupScreen}/>
                    </Stack.Navigator>
                    :
                    <Stack.Navigator headerMode={false}>
                        {Loading && <Stack.Screen name={CONSTANT.Loading} component={LoadingScreen}/>}
                        <Stack.Screen name={CONSTANT.Home} component={MainScreen}/>
                    </Stack.Navigator>
                }
            </NavigationContainer>
    )
}

export default Index

