import React from 'react'
import { StyleSheet, View, Dimensions, Image, FlatList, ScrollView } from 'react-native'

import { Ionicons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 

import {ProductList} from '../main/home'
import {Review} from './ServiceDescription'

import color from 'colors'
import {Text, RowView} from 'styles'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const uri= 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'
const Background = ()=>{
    return <View style={[StyleSheet.absoluteFillObject, {opacity:0.5}]}>
        <Image source={{uri}} style={{height:HEIGHT/2}} blurRadius={2}/>
    </View>
}

const Point = ({children})=><RowView>
    <Entypo name="dot-single" size={30} color={color.active} />
    <Text regular> {children}</Text>
</RowView>

const ServiceProvider = () => {
    const AVATAR_SIZE = 150
    const ICON_SIZE = 30
    return (
        <View style={{flex:1, backgroundColor:color.dark}}>
            <Background/>
            <Image source={{uri}} style={{height:AVATAR_SIZE, width:AVATAR_SIZE, position:'absolute', top:HEIGHT*0.25-AVATAR_SIZE/2, borderRadius:AVATAR_SIZE, zIndex: 100,alignSelf:'center'}}/>
            <View style={{backgroundColor:color.elevatedDark, position: 'absolute', bottom:0, height: HEIGHT*0.75,width:WIDTH,borderTopRightRadius:30, borderTopLeftRadius:30, paddingTop:AVATAR_SIZE/2+30}}>
                <ScrollView>
                    <View style={{alignSelf:'center', alignItems:'center'}}>
                        <Text size={25} bold>Dhruv Aggarwal</Text>
                        <Text style={{marginBottom:5}}>AI Programmer</Text>
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
                            <Text size={13} style={{marginLeft:10}}>{`+91 ${8595771213}`}</Text>
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
                            data={[1,2,3]}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            keyExtractor={()=>Math.random().toString()}
                            renderItem={()=><ProductList/>}
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
        </View>
    )
}

export default ServiceProvider

const styles = StyleSheet.create({
    button:{
        padding:10,
        backgroundColor:color.active,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    }
})
