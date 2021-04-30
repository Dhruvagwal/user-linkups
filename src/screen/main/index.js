import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'

import Home from './home'

import BottomBar from 'components/BottomBar'

import color from 'colors'

const HEIGHT = Dimensions.get('screen').height


const Index = () => {
    return (
        <View style={{flex:1}}>
            <View style={{height:HEIGHT*.05}}/>
            <View style={[{flex:1, alignItems:'stretch',flexDirection:'row'},StyleSheet.absoluteFillObject]}>
                <View style={{backgroundColor:color.dark, width:'85%'}}/>
                <View style={{backgroundColor:color.secondaryDark, width:'15%'}}/>
            </View>
            <Home/>
            <BottomBar/>
        </View>
    )
}

export default Index
export {BottomBar}

const styles = StyleSheet.create({
    option:{
        backgroundColor:color.lightDark,
        padding:10,
        borderRadius:100,
        paddingHorizontal:15
    }
})
