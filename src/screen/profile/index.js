import React from 'react'
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'

import {Logout} from '../../hooks/useAuth'
import {AuthConsumer} from '../../context/auth'

const WIDTH = Dimensions.get('screen').width

const Index = () => {

    const {setAuth} = AuthConsumer()
    const logout = async ()=>{
        await Logout()
        setAuth(false)
    }
    return (
        <View style={styles.container}>
            <View style={{alignItems:'stretch',alignSelf:'center',width:WIDTH/1.5, position:'absolute',bottom:20, justifyContent:'center', flex:1}}>
                <Button title='Logout' onPress={logout}/>
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container:{
        width: WIDTH
    }
})
