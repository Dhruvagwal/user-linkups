import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Pressable,ScrollView, Image, TextInput } from 'react-native'

import BottomBar from 'components/BottomBar'
import color from 'colors'
import { Ionicons } from '@expo/vector-icons';
import {Text, RowView} from 'styles'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const BackGround = ()=>{
    return <View style={[{flex:1},StyleSheet.absoluteFillObject]}>
        <View style={[{flex:1, alignItems:'stretch',flexDirection:'row', backgroundColor:color.dark, height:HEIGHT},StyleSheet.absoluteFillObject]}/>
        <View style={{backgroundColor:color.secondaryDark,height:1000, width:400,transform:[{rotate:'-30deg'}, {translateY:-100}]}}/>
    </View>
}

const Index = () => {
    return (
        <View style={{flex:1}}>
            <BackGround/>
            <BottomBar/>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({})
