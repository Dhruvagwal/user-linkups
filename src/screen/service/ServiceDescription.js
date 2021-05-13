import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, FlatList, Image, Pressable, AsyncStorage, Modal, ScrollView, StatusBar } from 'react-native'

import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import moment from 'moment'

import {BottomSheetScrollView, BottomSheetFlatList, BottomSheetDraggableView } from '@gorhom/bottom-sheet'

import BottomSheet from 'components/BottomSheet'
import {ServiceList} from '../service/ServiceProvider'

import * as RootNavigation from 'navigation/RootNavigation'
import CONSTANT  from 'navigation/navigationConstant'
import {getProviderById, uploadOrder} from 'hooks/useData'

import {DataConsumer} from 'context/data'

import {Text, RowView} from 'styles'
import color from 'colors'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const IMAGE_HEIGHT = HEIGHT*.75
const IMAGE_PAGINATION_HEIGHT = 50

const Point = ({children})=>{
    return <RowView style={{marginLeft:20}}>
        <View style={{padding:5, backgroundColor:color.active, borderRadius:3.5}}/>
        <Text size={17}> {children}</Text>
    </RowView>
}

const Review = ()=>{
    const IMAGE_SIZE = 50
    const uri = 'https://i.insider.com/5cb8b133b8342c1b45130629?width=700'
    return <View style={{backgroundColor:color.dark, opacity: 0.7, width:'100%', alignSelf:'center', marginTop:10, height:150, padding:20, borderRadius:20, justifyContent:'center'}}>
        <RowView>
            <Image source={{uri}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE, borderRadius:IMAGE_SIZE}}/>
            <View style={{marginLeft:10}}>
                <Text regular>Ananya Pandey</Text>
                <RowView>
                    <AntDesign name="star" size={24} color={color.active} />
                    <Text regular> 4.5</Text>
                </RowView>
            </View>
        </RowView>
        <Text size={12} style={{marginTop:5}}>
            Awesome Service with great Quality. Recomending You To...
        </Text>
    </View>
}

const SmallView = ({data})=>{
    const IMAGE_SIZE = 100
    return <View style={{backgroundColor: color.elevatedDark,borderRadius:20, margin:10}}>
        <Image source={{uri:data.imageLink[0].uri}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE, borderRadius:20}}/>
        <Text style={{width:IMAGE_SIZE, height: 45, textAlign:'center', padding:10}} numberofLines={1} adjustsFontSizeToFit>{data.name}</Text>
    </View>
}
const ServiceDescription = ({route}) => {
    const {id, provider} = route.params
    const data = provider.Providers.services.filter((item)=>item.id === id)[0]
    const [shown, setShown] = useState(false)
    const [list, setList] = useState([])
    const [providerData, setProviderData] = useState([])

    const addToCart = async ()=>{
        const CART = 'CART'
        var store_data = {Service_Id:id,  Provider_Id: provider.id, Quantity:1}
        var result = JSON.parse(await AsyncStorage.getItem(CART))
        result = result === null ? [] : result
        // await AsyncStorage.removeItem(CART)
        const status = result.filter(item =>item.Service_Id === id)
        if (status.length!==0){
            store_data = {...store_data, Quantity:status[0].Quantity+1}
        }
        const list = [...result.filter(item=>item.Service_Id!==id), store_data]
        await AsyncStorage.setItem(CART, JSON.stringify(list))

        const getData = async ()=>{
            list.map(async ({Provider_Id})=>{
                if (providerData.filter(item=>item.id!== Provider_Id && true)){
                        await getProviderById(Provider_Id).then(response=>{
                            setProviderData([...providerData, response.data[0]])
                        })
                }
            })
        }
        await getData()

        await getProviderById()
        setList(list)
        setShown(true)
    }
    shown && setTimeout(()=>setShown(false),2000)
    const serviceData = ({Service_Id})=>{
        const result = providerData.map(item=>{
            return item.Providers.services.map(item=>{
                if (item.id === Service_Id){
                   return item
                }
            })
        })[0]
        return result!==undefined?result.filter(item=>item)[0]:{}
    }

    const checkOut = async ()=>{
            var id = `ORD-${Math.floor(Math.random()*1000000)}`
            const order = {
                Provider_Id:provider.id,
                Service_Id:id,
                id,
                orderAt: moment(new Date()).format('LLL'),
                service:data,
                Quantity:1
            }
            console.log('trigger', id)
            await uploadOrder(order).then(()=>alert('sucess'))        
    }
    return (
        <View style={{flex:1, backgroundColor:color.dark}}>
            <Modal transparent={true} visible={shown}>
                <StatusBar backgroundColor={'rgba(0,0,0,0.9)'}/>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', backgroundColor:'rgba(0,0,0,0.9)'}}>
                    <View style={{backgroundColor:'rgb(26, 34, 47)', width:WIDTH, height:HEIGHT/3, borderTopLeftRadius:20, borderTopRightRadius:20, padding:20}}>
                        <RowView style={{justifyContent:'space-between'}}>
                            <Pressable onPress={()=>setShown(false)} style={[styles.button]}><Text>Continue</Text></Pressable>
                            <Pressable onPress={()=>RootNavigation.navigate(CONSTANT.Cart)} style={[styles.button]}><Text>Checkout</Text></Pressable>
                        </RowView>
                        <ScrollView horizontal>                        
                            <RowView>
                                {
                                    list.map(item=><SmallView key={item.Service_Id} data={serviceData(item)}/>)
                                }
                            </RowView>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View style={{height:IMAGE_HEIGHT}}>
                <FlatList
                    data={data.imageLink}
                    snapToInterval={IMAGE_HEIGHT}
                    decelerationRate='fast'
                    keyExtractor={()=>Math.random().toString()}
                    renderItem={({item})=>{
                        return <Image source={{uri:item.uri}} style={{width:WIDTH, height:IMAGE_HEIGHT}}/>
                    }}
                />
            </View>
            <View style={{position:'absolute', right:10, top:IMAGE_HEIGHT/6.5}}>
                <FlatList
                    data={data.imageLink}
                    snapToInterval={IMAGE_PAGINATION_HEIGHT}
                    decelerationRate='fast'
                    keyExtractor={()=>Math.random().toString()}
                    renderItem={({item})=>{
                        return <View style={{marginVertical:10, borderWidth:2, borderColor:color.white, borderRadius:10,overflow:'hidden'}}>
                            <Image source={{uri:item.uri}} style={{width:IMAGE_PAGINATION_HEIGHT, height:IMAGE_PAGINATION_HEIGHT}}/>
                        </View>
                    }}
                />
            </View>
            <BottomSheet snapPoints={[HEIGHT*.25,HEIGHT*.85]}>
                <BottomSheetScrollView>
                    <View style={{padding:20, paddingTop:0}}>
                        <RowView style={{width:'80%', alignItems:'flex-start', overflow:'visible', justifyContent:'space-between'}}>
                            <Text size={25} style={{width:WIDTH/1.4}} bold>{data.name}</Text>
                            <Text size={20}>
                                <AntDesign name="star" size={24} color={color.active} />
                                {' '}4.5
                            </Text>
                        </RowView>
                        <Text regular style={{color:color.inActive}}>{provider.name}</Text>
                        <RowView style={{justifyContent:'space-between', marginVertical:20}}>

                            <RowView style={{alignItems:'flex-end'}}>
                                <View>
                                    <Text size={12}>Price</Text>
                                    <Text size={30} style={{color:color.active}} regular>₹ {data.price} </Text>
                                </View>
                                <View>
                                    <Text size={15} style={{color:color.inActive, textDecorationLine:'line-through'}} regular>₹ {data.mrp}</Text>
                                    <Text style={{color:color.inActive}} regular>Save ₹ {data.mrp - data.price}</Text>
                                </View>
                            </RowView>
                            <View style={{backgroundColor:color.active, padding:10, borderRadius:20}}>
                                <AntDesign name="heart" size={27} color={color.white} />
                            </View>

                        </RowView>
                        <Text style={{textAlign:'justify', marginTop:20}}>This Service provides the leading capacity to enhance your stamina in a very fruit full way.</Text>
                        <Text>{'\n'}</Text>
                        {/* Service Provider Detail */}
                        <View>
                            <RowView style={{justifyContent:'space-between'}}>
                                <Text regular>About Service Provider</Text>
                                <RowView>
                                    <Text size={12}>See More</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color={color.white} />
                                </RowView>
                            </RowView>
                            <View style={{marginTop:5}}>
                                <Point>Long Experience</Point>
                                <Point>Reliable</Point>
                                <Point>Price Effective</Point>
                                <Point>Quality Assurance</Point>
                            </View>
                            <Text>{'\n'}</Text>
                            <View style={{marginTop:20}}>
                                    <Text regular>Users Review</Text>
                                <RowView style={{justifyContent: 'space-between', marginTop:10}}>
                                    <Text size={12} style={{color:color.inActive, alignSelf:'flex-end'}}>5 out of 150 reviews</Text>
                                    <RowView>
                                        <Text size={12}>See More</Text>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color={color.white} />
                                    </RowView>
                                </RowView>
                                {[1,2,3,4].map((item)=>{
                                    return <Review key={item.toString()}/>
                                })}
                            </View>
                        </View>
                    </View>
                    <Text>{'\n'}</Text>
                    <View>
                        <Text style={{marginLeft:20}}>Similar Services</Text>
                        {/* <BottomSheetFlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginTop:10}}
                            horizontal
                            data={[1,2,3,4]}
                            keyExtractor={()=>Math.random().toString()}
                            renderItem={()=><ProductList/>}
                        /> */}

                    </View>
                    <Text>{'\n'}</Text>
                    <View>
                        <Text style={{marginLeft:20}}>Shree Ram Nivas Mechanic Services</Text>
                        <BottomSheetFlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginTop:10}}
                            horizontal
                            data={provider.Providers.services}
                            keyExtractor={()=>Math.random().toString()}
                            renderItem={({item})=><ServiceList data={item} provider={provider}/>}
                        />

                    </View>
                    <Text>{'\n'}</Text>
                    <Text>{'\n'}</Text>
                    <Text>{'\n'}</Text>

                </BottomSheetScrollView>
                <Pressable onPress={addToCart} style={{position:'absolute',alignItems:'center',bottom:40, backgroundColor:color.active, width:'45%', padding:15, borderTopRightRadius:50, borderBottomRightRadius:50}}>
                    <Text bold>Add To Cart</Text>
                </Pressable>
                <Pressable onPress={checkOut} style={{position:'absolute',bottom:40,right:0,alignItems:'center', backgroundColor:color.active, width:'45%', padding:15, borderTopLeftRadius:50, borderBottomLeftRadius:50}}>
                    <Text bold>Checkout</Text>
                </Pressable>
            </BottomSheet>
        </View>
    )
}
export {Review}
export default ServiceDescription

const styles = StyleSheet.create({
    style:{
        textDecorationLine:'line-through'
    },
    button:{
        backgroundColor:color.active,
        padding:10,
        borderRadius:5,
        width:WIDTH/2.3,
        alignItems:'center',
        justifyContent:'center'
    }
})
