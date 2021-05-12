import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Dimensions, TextInput, Image, FlatList  } from 'react-native'

import {Text, RowView} from 'styles'
import color from 'colors'

import _ from 'lodash.chunk'

import { FontAwesome5 } from '@expo/vector-icons'; 

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const Background = ()=>{
    return <View style={[{flex:1},StyleSheet.absoluteFillObject]}>
        <View style={[{flex:1, alignItems:'stretch',flexDirection:'row', backgroundColor:color.dark, height:HEIGHT},StyleSheet.absoluteFillObject]}/>
        <View style={{backgroundColor:color.secondaryDark,height:1550, width:'100%',transform:[{rotate:'36deg'}]}}/>
    </View>
}

const ServiceListView = ({data})=>{
    // console.log(data)
    return <View style={{backgroundColor:color.elevatedDark, marginVertical:10, width:WIDTH/2.2, opacity: 0.8}}>
        <Image source={{uri:data.imageLink[0].uri}} style={{width:WIDTH/2.2, height:200,}}/>
        <View style={{padding:10}}>
            <Text>{data.name}</Text>
        </View>
    </View>
} 
const ServiceList = ({route}) => {
    const {id, providers} = route.params
    const [data, setData] = useState([])
    useEffect(()=>{
        const getData = ()=>{
            providers.map((item)=>{
                const service = item.Providers.services.filter(item=>item.CatSID===id && item)
                setData(service)
            })
        }
        getData()
    },[])
    const list = [1,2,3,4,5,6,7,8,9]
    const listReshape = (list)=>{
        list 
    }
    listReshape(list)
    return (
        <View style={{flex:1}}>
            <Background/>
            <View style={{height:HEIGHT*.1}}/>
            <RowView style={{backgroundColor:color.lightDark,borderRadius:100,justifyContent: 'space-between', alignSelf: 'center',}}>
                    <TextInput placeholder='Search' placeholderTextColor={color.inActive} style={styles.TextInput}/>
                    <FontAwesome5 name="microphone" size={24} color={color.active} style={{marginRight:20}} />
            </RowView>
            <View style={{padding:10}}>
                <FlatList
                    data={data}
                    key={({item})=>item.id}
                    renderItem={({item,index})=>{
                        // console.log(index)
                        if (data.length >= index/2){
                            // console.log(data.slice(index, index+1))
                            return <RowView key={item.id} style={{justifyContent:'space-between'}}>
                                {/* <ServiceListView data={data[index]}/> */}
                                {/* <ServiceListView data={data[index-1]}/> */}
                            </RowView>
                        }
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
