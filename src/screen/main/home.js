import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions, View, FlatList, Pressable, Image, ScrollView, ImageBackground } from 'react-native'

import { Feather, MaterialIcons,FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 

import * as RootNavigation from 'navigation/RootNavigation'
import CONSTANT  from 'navigation/navigationConstant'

import { getProvidersByCategory } from 'hooks/useData'

import {Text, RowView} from 'styles'
import color from 'colors'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const ICON_SIZE = 50

const Category = ({data, setActive, active})=>{
    const CATEGORY_SIZE = 90
    return <View style={{height:HEIGHT*0.17}}>
        <Pressable onPress={()=>setActive(data)} style={{
                backgroundColor:active? color.active: color.lightDark, 
                width:CATEGORY_SIZE, 
                height:CATEGORY_SIZE, 
                borderRadius:30, 
                marginHorizontal:10, 
                justifyContent:'center', 
                alignItems:'center'
            }}>
               <Image source={{uri:data.icon}} style={{height:ICON_SIZE, width:ICON_SIZE}}/>
        </Pressable>
        {active && <View style={{backgroundColor:color.active, padding:5,borderRadius:100, alignSelf:'center', marginTop:10}}/>}
    </View>

}

const PRODUCT_HEIGHT = 250
const PRODUCT_WIDTH = 200
const ProductList = ({data, active})=>{
    const [like, setLike] = useState(false)
    return <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.ServiceProvider, {data, active})} style={{marginHorizontal:15}}>
        <Image source={{uri:data.imageUri}} style={{height:PRODUCT_HEIGHT, width:PRODUCT_WIDTH, borderRadius:30, opacity:.9}}/>
        <Pressable onPress={()=>setLike(like=>!like)} style={{position:'absolute', right:15, top:15}}>
            <AntDesign name="heart" size={30} color={like?color.active:color.white} />
        </Pressable>
        <Text style={styles.price} regular>₹ {data.info.price}</Text>
        <RowView style={{justifyContent:'space-between', marginTop:10}}>
            <Text style={{ width:PRODUCT_WIDTH/1.5, textTransform:'capitalize'}} regular>{data.name}</Text>
            <RowView>
                <AntDesign name="star" size={24} color={color.active} />
                <Text>4.5</Text>
            </RowView>
        </RowView>
    </Pressable>
}

const SubCategory = ({width=300, data={}})=>{
    return <View source={{uri:data.image_Link}} style={{width, height:180, marginHorizontal:15, borderRadius:20, overflow:'hidden', marginBottom:20, backgroundColor: data.style.background}}>
                <View style={[StyleSheet.absoluteFillObject, {justifyContent:'center'}]}>
                    <Image source={{uri:data.image_Link}}  style={{width, height:170, resizeMode:'contain', position:'absolute', right: -width/2,}}/>
                </View>
                <Text style={{margin:10, width:230, color:data.style.text}}  numberOfLines={1} adjustsFontSizeToFit size={30} bold>{data.name}</Text>
                <Text style={{...styles.price,top:100, color:data.style.text}} regular>₹ 510</Text>
        </View>
}

const Index = ({state}) => {
    const {category}  = state
    const [active, setActive] = useState({})
    const [providers, setProviders] = useState([])
    useEffect(()=>{
        getProvidersByCategory(active.id).then((response)=>setProviders(response))
    },[active])
    Object.keys(category).length!==0  && Object.keys(active).length===0 && setActive(category[0])

    
    return (
        <View>
            <ScrollView bounces={false}>
                {/* Header */}
                    <RowView style={{justifyContent:'space-between', margin:20}}>
                        <Text size={30} bold>Linkups</Text>
                        <RowView style={{width:WIDTH*.35, justifyContent:'space-between'}}>
                            <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.SearchBar)}>
                                <RowView style={styles.Input}>
                                    <Feather name="search" size={27} color={color.white} style={{marginRight:5}} />
                                </RowView>
                            </Pressable>
                            <AntDesign name="heart" size={27} color={color.white} />
                        </RowView>
                    </RowView>
                {/* Header End*/}

                {/* Category */}
                    <View style={{marginTop:HEIGHT*.02}}>
                        <Text style={{paddingHorizontal:20, marginBottom:10}}>Categories</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={category}
                            keyExtractor={()=>Math.random().toString()}
                            renderItem = {({item})=><Category data={item} setActive={setActive} active={item.id === active.id}/>}
                        />
                    </View>
                {/* Category End*/}
                {/* Product List */}
                    <View>
                        <Text style={{paddingHorizontal:20, marginBottom:10, textTransform:'capitalize'}}>Top {active.name}</Text>
                        <FlatList
                            horizontal
                            data={providers}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={()=>Math.random().toString()}
                            renderItem = {({item})=><ProductList data={item} active={active}/>}
                        />
                        <Text>{'\n'}</Text>
                    </View>
                {/* Product List End*/}
                {/* Sub Category */}
                    <View>
                        <Text style={{paddingHorizontal:20, marginBottom:10, textTransform:'capitalize'}}>{active.name} Services</Text>
                        <FlatList
                            horizontal
                            data={active.services}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={()=>Math.random().toString()}
                            snapToInterval={330}
                            decelerationRate='fast'
                            renderItem = {({item})=><SubCategory data={item}/>}
                        />
                        <Text>{'\n'}</Text>
                    </View>
                {/* Sub Category End*/}
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
            </ScrollView>
        </View>
    )
}
export {ProductList, SubCategory}
export default Index

const styles = StyleSheet.create({
    Input:{
        backgroundColor:color.lightDark, 
        width:WIDTH*.2, 
        borderRadius:100, 
        height:50,
        justifyContent:'flex-end',
        opacity:0.7,
        padding:5
    },
    price:{
        position:'absolute',
        top:PRODUCT_HEIGHT/1.5,
        backgroundColor:color.dark, 
        alignSelf:'flex-start', 
        padding:10,
        borderTopRightRadius:100,
        borderBottomRightRadius:100,
        color:color.active,
    }
})
