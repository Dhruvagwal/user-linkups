import React, {useEffect, useState} from 'react'

import CONSTANT from './navigationConstant.json'

import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthConsumer} from 'context/auth'
import {DataConsumer} from 'context/data'

import MainScreen from '../screen/main/index'
import LoginScreen from '../screen/auth/login'
import SignupScreen from '../screen/auth/signup'
import LoadingScreen from '../screen/Loading'
import OrderList from '../screen/order'

import color from 'colors'

import {navigationRef} from './RootNavigation';

import { verifyToken } from '../hooks/useAuth'

const routeNameRef = React.createRef();

const Index = () => {
    const Stack = createStackNavigator()
    
    const {state, setAuth} = AuthConsumer()
    const {setName} = DataConsumer()
    
    const [Loading, setLoading] = useState(true)

    useEffect(()=>{
        const result = verifyToken().then(response=>{setAuth(response); setLoading(false)})
    },[])

    const BlackTheme = {
        ...DefaultTheme,
        colors:{
            ...DefaultTheme,
        },
    }

    return (<NavigationContainer 
                    ref={navigationRef} 
                    theme={BlackTheme}
                    onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
                    onStateChange={async () => {
                        const name = await navigationRef.current.getCurrentRoute().name
                        setName(name)
                    }}      
                >
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
                            <Stack.Screen name={CONSTANT.Cart} component={OrderList}/>
                        </Stack.Navigator>
                    }
            </NavigationContainer>
    )
}

export default Index

