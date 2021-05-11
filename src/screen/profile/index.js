import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Pressable,ScrollView, Image, TextInput} from 'react-native'

import CONSTANT from 'navigation/navigationConstant'
import BottomBar from 'components/BottomBar'
import color from 'colors'
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, FontAwesome, Foundation } from '@expo/vector-icons'; 
import {Text, RowView} from 'styles'

import {Logout} from 'hooks/useAuth'
import {AuthConsumer} from 'context/auth'
import {DataConsumer} from 'context/data'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const BackGround = ()=>{
    return <View style={[{flex:1},StyleSheet.absoluteFillObject]}>
        <View style={[{flex:1, alignItems:'stretch',flexDirection:'row', backgroundColor:color.dark, height:HEIGHT},StyleSheet.absoluteFillObject]}/>
        <View style={{backgroundColor:color.secondaryDark,height:1000, width:400,transform:[{rotate:'45deg'}, {translateY:-100}]}}/>
    </View>
}

const uri = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const IMAGE_SIZE = 150

const Options=({children, onPress})=>{
return <Pressable onPress={onPress}>
        <RowView style={{paddingVertical:15, justifyContent:'space-between'}}>
            <RowView>
                {children}
            </RowView>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={color.white} />
        </RowView>
    </Pressable>
}

const Index = ({navigation}) => {
    const {setAuth} = AuthConsumer()
    const {state:{profile}} = DataConsumer()
    const changeLocation=async ()=>{
        navigation.navigate(CONSTANT.ChangeLocation)
    }
    const Auth = async ()=>{
        await Logout()
        await setAuth(false)
    }
    return (
        <View style={{flex:1}}>
            <BackGround/>

            <View style={{height:HEIGHT*.05}}/>
            <View style={{padding:20,flex:1}}>
                <RowView style={{justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
                    <View>
                        <Text bold size={30}>Linkups</Text>
                        <Text>Profile</Text>
                    </View>
                </RowView>
                <Image source={{uri}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE, borderRadius:IMAGE_SIZE, zIndex:100, alignSelf:'center'}}/>
                <View style={{backgroundColor:color.elevatedDark,opacity:0.8, borderRadius:20, flex:.85, marginTop:-IMAGE_SIZE/2, paddingTop:IMAGE_SIZE/2+10, padding:10}}>
                    <Text size={20} style={{alignSelf:'center'}} bold>{profile.Name}</Text>
                    <Text style={{alignSelf:'center'}} regular>+91 {profile.id.replace('91','')}</Text>
                    <View style={{flex:1, justifyContent:'center'}}>

                        <Options onPress={changeLocation}>
                            <FontAwesome name="address-book" size={24} color={color.white} />
                            <Text>  My Address</Text>
                        </Options>

                        <Options>
                            <AntDesign name="customerservice" size={24} color={color.white} />
                            <Text>  Become a Seller</Text>
                        </Options>
                        <Options>
                            <Entypo name="help" size={24} color={color.white} />
                            <Text>  Help & Support</Text>
                        </Options>
                        <Options>
                            <Foundation name="info" size={24} color={color.white} style={{marginLeft:5}} />
                            <Text>   About Us</Text>
                        </Options>
                    </View>
                </View>
                <Pressable onPress={Auth}>
                    <RowView style={{backgroundColor:color.active, padding:10, marginTop:15, borderRadius:100, alignSelf:'center'}}>
                        <MaterialIcons name="exit-to-app" size={24} color={color.white} />
                        <Text regular> Log Out</Text>
                    </RowView>
                </Pressable>
            </View>
            <BottomBar/>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
})
