import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, Image, FlatList, ScrollView, Pressable } from 'react-native'

import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import BottomSheet from 'components/BottomSheet'

import {ProductList} from '../main/home'
import {Review} from './ServiceDescription'

import CONSTANT from 'navigation/navigationConstant'
import * as RootNavigation from 'navigation/RootNavigation'

import color from 'colors'
import {Text, RowView} from 'styles'
import MapView,{Marker} from 'react-native-maps';

import {DataConsumer} from 'context/data'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width


const uri= 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'
const Background = ()=>{
    return <View style={[StyleSheet.absoluteFillObject]}>
        <MapView style={{height:HEIGHT, width:WIDTH}}></MapView>
    </View>
}

const Point = ({children})=><RowView>
    <Entypo name="dot-single" size={30} color={color.active} />
    <Text regular> {children}</Text>
</RowView>


const PRODUCT_HEIGHT = 250
const PRODUCT_WIDTH = 250

const ServiceList = ({data, provider})=>{
    const [like, setLike] = useState(false)
    return <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.ServiceDescription, {id:data.id, provider})} style={{marginHorizontal:15}}>
        <Image source={{uri:data.imageLink[0].uri}} style={{height:PRODUCT_HEIGHT, width:PRODUCT_WIDTH, borderRadius:30, opacity:.9}}/>
        <Pressable onPress={()=>setLike(like=>!like)} style={{position:'absolute', right:15, top:15}}>
            <AntDesign name="heart" size={30} color={like?color.active:color.white} />
        </Pressable>
        <Text style={styles.price} regular>₹ {data.price}</Text>
        <RowView style={{justifyContent:'space-between', marginTop:10}}>
            <Text style={{ width:PRODUCT_WIDTH/1.5, textTransform:'capitalize'}} regular>{data.name}</Text>
            <RowView>
                <AntDesign name="star" size={24} color={color.active} />
                <Text>4.5</Text>
            </RowView>
        </RowView>
    </Pressable>
}
const ServiceProvider = ({route}) => {
    const AVATAR_SIZE = 150
    const ICON_SIZE = 30
    const {data, active} = route.params

    return (
        <View style={{flex:1, backgroundColor:color.dark}}>
            <Background/>
            <BottomSheet snapPoints={[HEIGHT*.245, HEIGHT*.85]}>
                <View style={{backgroundColor:color.elevatedDark,width:WIDTH,borderTopRightRadius:30, borderTopLeftRadius:30}}>
                    <ScrollView style={{marginTop:10}}>
                        <Image source={{uri:data.imageUri}} style={{height:AVATAR_SIZE, width:AVATAR_SIZE, borderRadius:AVATAR_SIZE, zIndex: 100,alignSelf:'center'}}/>
                        <View style={{alignSelf:'center', alignItems:'center'}}>
                            <Text size={25} style={{ textAlign:'center', width:WIDTH*0.9, textTransform:'capitalize'}} bold numberOfLines={2} adjustsFontSizeToFit>{data.name}</Text>
                            <Text style={{marginBottom:5, textTransform:'capitalize'}}>{active.name}</Text>
                            <Text size={20} regular><AntDesign name="star" size={24} color={color.active} /> 4.5</Text>
                        </View>
                        <RowView style={{alignSelf:'center', width:250, justifyContent:'space-between', marginTop:20}}>
                            <View style={styles.button}><Ionicons name="call" size={ICON_SIZE} color={color.white} /></View>
                            <View style={styles.button}><Entypo name="message" size={ICON_SIZE} color={color.white} /></View>
                            <View style={styles.button}><AntDesign name="sharealt" size={ICON_SIZE} color={color.white} /></View>
                        </RowView>
                        <Text>{'\n'}</Text>
                        <View>
                            <RowView style={{width:WIDTH/1.1, marginLeft:20, marginBottom:10}}>
                                <Ionicons name="call" size={ICON_SIZE-10} color={color.inActive} />
                                <Text size={13} style={{marginLeft:10}}>{`+91 ${data.id.replace('91','')}`}</Text>
                            </RowView>
                            <RowView style={{width:WIDTH/1.1, marginLeft:20}}>
                                <Entypo name="address" size={24} color={color.inActive} />
                                <Text size={13} style={{marginLeft:10, width:WIDTH/1.2}}>{`C-Block, Shadra 133/1, Strret No-11, Delhi:110053`}</Text>
                            </RowView>
                        </View>
                        <Text>{'\n'}</Text>
                        <View style={{margin:10}}>
                            <Text>Features</Text>
                            <Point>Highly Productive</Point>
                            <Point>Cost Effective</Point>
                            <Point>Reliable</Point>
                            <Point>Highlt Expereinced</Point>
                        </View>
                        <Text>{'\n'}</Text>
                        <View>
                            <Text style={{paddingHorizontal:20, paddingBottom:10}} regular>Services</Text>
                            <FlatList
                                data={data.Providers.services}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                keyExtractor={()=>Math.random().toString()}
                                renderItem={({item})=><ServiceList data={item} provider={data}/>}
                            />
                        </View>
                        <Text>{'\n'}</Text>
                        <View style={{margin:10}}>
                            <Text style={{paddingHorizontal:10}}>Customer Reviews</Text>
                            <Review/>
                        </View>

                        <Text>{'\n'}</Text>
                        <Text>{'\n'}</Text>
                    </ScrollView>
                </View>
                <View style={{backgroundColor:color.active, position:'absolute', bottom:20, alignSelf:'center', padding:10, borderRadius:100, width:150, alignItems:'center'}}>
                    <Text bold>HIRE ME</Text>
                </View>
            </BottomSheet>
        </View>
    )
}

export default ServiceProvider
export {ServiceList}

const styles = StyleSheet.create({
    button:{
        padding:10,
        backgroundColor:color.active,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    }
})
