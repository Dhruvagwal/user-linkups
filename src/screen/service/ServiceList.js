import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Dimensions, TextInput, Image, FlatList, Pressable  } from 'react-native'

import {Text, RowView} from 'styles'
import color from 'colors'

import chunck from 'lodash.chunk'

import * as RootNavigation from 'navigation/RootNavigation'
import CONSTANT  from 'navigation/navigationConstant'

import { FontAwesome5 } from '@expo/vector-icons'; 

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const Background = ()=>{
    return <View style={[{flex:1},StyleSheet.absoluteFillObject]}>
        <View style={[{flex:1, alignItems:'stretch',flexDirection:'row', backgroundColor:color.dark, height:HEIGHT},StyleSheet.absoluteFillObject]}/>
        <View style={{backgroundColor:color.secondaryDark,height:1550, width:'100%',transform:[{rotate:'36deg'}]}}/>
    </View>
}

const ServiceListView = ({data, providers})=>{

    const provider = providers.filter(item=>item.Providers.services.filter(item=>item.id === data.id && item))[0]
    
    return <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.ServiceDescription, {id:data.id, provider})} style={{backgroundColor:color.elevatedDark, marginVertical:10, width:WIDTH/2.2, opacity: 0.8, overflow:'hidden'}}>
        <Image source={{uri:data.imageLink[0].uri}} style={{width:WIDTH/2.2, height:200,}}/>
        <View style={{padding:10}}>
            <RowView style={{justifyContent:'space-between'}}>
                <Text size={18} numberOfLines={2} adjustsFontSizeToFit regular style={{width:'65%'}}>{data.name}</Text>
                <Text style={{color:color.active}} regular>₹ {data.price}</Text>
            </RowView>
        </View>
    </Pressable>
} 
const ServiceList = ({route}) => {
    
    const {id, providers} = route.params
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        const getData = ()=>{
            providers.map((item)=>{
                const service = item.Providers.services.filter(item=>item.CatSID===id && item)
                setData(service)
            })
        }
        getData()
    },[])

    return (
        <View style={{flex:1}}>
            <Background/>
            <View style={{height:HEIGHT*.1}}/>
            <RowView style={{backgroundColor:color.lightDark,borderRadius:100,justifyContent: 'space-between', alignSelf: 'center',}}>
                    <TextInput placeholder='Search' placeholderTextColor={color.inActive} style={styles.TextInput} onChangeText={setSearch} value={search}/>
                    <FontAwesome5 name="microphone" size={24} color={color.active} style={{marginRight:20}} />
            </RowView>
            <View style={{padding:10}}>
                <FlatList
                    data={chunck(data.filter((item)=>item.name.toUpperCase().includes(search.toUpperCase()) && item), 2)}
                    keyExtractor={()=>Math.random().toString()}
                    renderItem={({item,index})=>{
                        return <RowView style={{justifyContent:'space-between'}}>
                            {item.filter(item=>item.isActive === true && item).map((item)=><ServiceListView key={item.id} data={item} providers={providers}/>)}
                        </RowView>
                    }}
                />
            </View>
        </View>
    )
}

export default ServiceList

const styles = StyleSheet.create({
    TextInput:{   
        padding:10,
        paddingHorizontal:20,
        fontSize:20,
        color:color.white,
        width:'85%'
    },
})
