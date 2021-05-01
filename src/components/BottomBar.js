import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'

import {Text, RowView} from 'styles'

import { Foundation, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'; 

import * as RootNavigation from 'navigation/RootNavigation';
import CONSTANT from 'navigation/navigationConstant';

import {DataConsumer} from 'context/data'

import color from 'colors'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const BottomBar=()=>{

    const {state:{currentRouteName}} = DataConsumer()

    const ICON_SIZE = 27

    const Activate = {
        'home': currentRouteName === CONSTANT.Home && true,
        'cart': currentRouteName === CONSTANT.Cart && true,
        'service': currentRouteName === CONSTANT.Service && true,
        'profile': currentRouteName === CONSTANT.Profile && true
    }

    return <RowView style={{position:'absolute', bottom:0, width:WIDTH,height:HEIGHT*.08, opacity:0.95, backgroundColor:color.dark, justifyContent:'space-around'}}>

        <Pressable onPress={()=>{RootNavigation.navigate(CONSTANT.Home)}} style={[styles.option,{backgroundColor:Activate.home? color.lightDark: '#0000'}]}>
            <RowView>
                <Foundation name="home" size={ICON_SIZE} color={Activate.home?color.active:color.inActive} />
                {Activate.home && <Text style={{color:color.active}} regular> Home</Text>}
            </RowView>
        </Pressable>

        
        <Pressable onPress={()=>{RootNavigation.navigate(CONSTANT.Cart)}} style={[styles.option,{backgroundColor:Activate.cart? color.lightDark: '#0000'}]}>
            <RowView>
                <FontAwesome5 name="shopping-bag" size={ICON_SIZE} color={Activate.cart?color.active:color.inActive} />
                {Activate.cart && <Text style={{color:color.active}} regular> Bag</Text>}
            </RowView>
        </Pressable>

        <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.Service)} style={[styles.option,{backgroundColor:Activate.service? color.lightDark: '#0000'}]}>
            <RowView>
                <AntDesign name="customerservice" size={ICON_SIZE} color={Activate.service?color.active:color.inActive} />
                {Activate.service && <Text style={{color:color.active}} regular> Services</Text>}
            </RowView>
        </Pressable>

        <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.Profile)} style={[styles.option,{backgroundColor:Activate.profile? color.lightDark: '#0000'}]}>
            <RowView>
                <Feather name="user" size={ICON_SIZE} color={Activate.profile?color.active:color.inActive} />
                {Activate.profile && <Text style={{color:color.active}} regular> Profile</Text>}
            </RowView>
        </Pressable>
    </RowView>
    
}

export default BottomBar

const styles = StyleSheet.create({
    option:{
        backgroundColor:color.lightDark,
        padding:10,
        borderRadius:100,
        paddingHorizontal:15
    }
})
