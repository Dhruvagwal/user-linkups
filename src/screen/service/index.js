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

const ServiceListView = ()=>{
    const IMAGE_SIZE = 150
    const uri = "https://us.123rf.com/450wm/bialasiewicz/bialasiewicz1805/bialasiewicz180500624/101345144-decorative-mirror-and-modern-painting-hanging-on-the-wall-with-molding-in-dark-grey-living-room-inte.jpg?ver=6"
    return <RowView style={{backgroundColor:color.dark, opacity:0.7, height:IMAGE_SIZE, marginBottom:20}}>
        <Image source={{uri}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE}}/>
        <View style={{margin:10, alignSelf:'flex-start', width: WIDTH-(IMAGE_SIZE+60),justifyContent:'space-around' ,height:IMAGE_SIZE-20}}>
            <View>
                <Text regular size={20}>Micke Sofa</Text>
                <Text size={20}>₹ 55,000</Text>
            </View>
            <Text regular>Status: Recieved</Text>
        </View>
    </RowView>
}
const Index = () => {
    const value = ['Processing', 'Cancelled', 'Completed']
    const [active, setActive] = useState(value[0])
    return (
        <View style={{flex:1}}>
            <BackGround/>
            <View style={{height:HEIGHT*.05}}/>
            <View style={{padding:20,flex:1}}>
                <RowView style={{justifyContent:'space-between', alignItems:'flex-start'}}>
                    <View style={{marginBottom:20}}>
                        <Text bold size={30}>Linkups</Text>
                        <Text>Services</Text>
                    </View>
                    <Ionicons name="filter" size={30} color={color.inActive} />
                </RowView>
                <RowView style={{borderBottomColor:color.lightDark, borderBottomWidth:1,justifyContent:'space-between'}}>
                    
                    {
                        value.map(item=><Pressable onPress={()=>setActive(item)} key={item}>
                            <Text style={{...styles.contain,backgroundColor:item===active?color.lightDark:'#0000'}}>{item}</Text>
                        </Pressable>)
                    }
                </RowView>
                <ScrollView style={{paddingTop:20}} showsVerticalScrollIndicator={false}>
                    <ServiceListView/>
                    <ServiceListView/>
                    <ServiceListView/>
                    <ServiceListView/>
                    <ServiceListView/>
                    <Text>{'\n'}</Text>
                    <Text>{'\n'}</Text>
                </ScrollView>
            </View>
            <BottomBar/>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    contain:{
        paddingVertical:10,
        paddingHorizontal:5
    }
})
