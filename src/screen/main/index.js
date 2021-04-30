import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import Home from './home'

import color from 'colors'

const HEIGHT = Dimensions.get('screen').height

const Index = () => {
    return (
        <View style={{flex:1, padding:20}}>
            <View style={{height:HEIGHT*.05}}/>
            <View style={[{flex:1, alignItems:'stretch',flexDirection:'row'},StyleSheet.absoluteFillObject]}>
                <View style={{backgroundColor:color.dark, width:'85%'}}/>
                <View style={{backgroundColor:color.secondaryDark, width:'15%'}}/>
            </View>
            <Home/>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({})
