import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Pressable } from 'react-native'

import Home from './home'

import {Text, RowView} from 'styles'

import { Foundation, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'; 

import color from 'colors'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const BottomBar=()=>{
    const NAME = {
        home:'home',
        bag:'bag',
        service:'service',
        profile:'profile'
    }

    const [active, setActive] = useState(NAME.home)

    const ICON_SIZE = 27


    return <RowView style={{position:'absolute', bottom:0, width:WIDTH,height:HEIGHT*.08, opacity:0.95, backgroundColor:color.dark, justifyContent:'space-around'}}>
        <Pressable onPress={()=>setActive(NAME.home)} style={[styles.option,{backgroundColor:NAME.home === active? color.lightDark: '#0000'}]}>
            <RowView>
                <Foundation name="home" size={ICON_SIZE} color={active===NAME.home?color.active:color.inActive} />
                {NAME.home === active && <Text style={{color:color.active}} regular> Home</Text>}
            </RowView>
        </Pressable>

        
        <Pressable onPress={()=>setActive(NAME.bag)} style={[styles.option,{backgroundColor:NAME.bag === active? color.lightDark: '#0000'}]}>
            <RowView>
                <FontAwesome5 name="shopping-bag" size={ICON_SIZE} color={active===NAME.bag?color.active:color.inActive} />
                {NAME.bag === active && <Text style={{color:color.active}} regular> Bag</Text>}
            </RowView>
        </Pressable>

        <Pressable onPress={()=>setActive(NAME.service)} style={[styles.option,{backgroundColor:NAME.service === active? color.lightDark: '#0000'}]}>
            <RowView>
                <AntDesign name="customerservice" size={ICON_SIZE} color={active===NAME.service?color.active:color.inActive} />
                {active === NAME.service && <Text style={{color:color.active}} regular> Services</Text>}
            </RowView>
        </Pressable>

        <Pressable onPress={()=>setActive(NAME.profile)} style={[styles.option,{backgroundColor:NAME.profile === active? color.lightDark: '#0000'}]}>
            <RowView>
                <Feather name="user" size={ICON_SIZE} color={active===NAME.profile?color.active:color.inActive} />
                {NAME.profile === active && <Text style={{color:color.active}} regular> Profile</Text>}
            </RowView>
        </Pressable>
    </RowView>
    
}

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

const styles = StyleSheet.create({
    option:{
        backgroundColor:color.lightDark,
        padding:10,
        borderRadius:100,
        paddingHorizontal:15
    }
})
