import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Image, Pressable, TextInput, AsyncStorage } from 'react-native'

import BottomBar from 'components/BottomBar'
import BottomSheet from 'components/BottomSheet'
import {BottomSheetScrollView} from '@gorhom/bottom-sheet'

import { AntDesign } from '@expo/vector-icons'; 
import moment from 'moment'

import {getProviderById, uploadOrder} from 'hooks/useData'

import {Text, RowView} from 'styles'
import color from 'colors'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const BackGround = ()=>{
    return <View style={[{flex:1},StyleSheet.absoluteFillObject]}>
        <View style={[{flex:1, alignItems:'stretch',flexDirection:'row', backgroundColor:color.dark, height:HEIGHT},StyleSheet.absoluteFillObject]}/>
        <View style={{backgroundColor:color.secondaryDark,height:1550, width:'100%',transform:[{rotate:'36deg'}]}}/>
    </View>
}

const CartView = ({children, style})=>{
    return <View style={{flex:1, ...style}}>
            <BackGround/>
            <View style={{height:HEIGHT*.05}}/>
            <View style={{flex:1}}>
                {children}
            </View>
            <BottomBar/>
        </View>
}

const CartListView = ({data, Quantity, setClose=()=>{}, item, quantiyEdit=()=>{}})=>{
    const IMAGE_SIZE = 150
    const [count, setCount] = useState(Quantity)
    useEffect(()=>{
        count!==Quantity && quantiyEdit(count, item)
    },[count])
    const URI = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
    return <Pressable>
            <RowView style={{backgroundColor:color.dark, opacity:0.7, height:IMAGE_SIZE, marginBottom:20, borderRadius:20, overflow:'hidden'}}>
            <Image source={{uri:data.imageLink!==undefined ? data.imageLink[0].uri: URI}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE, borderRadius:20}}/>
            <View style={{margin:10, alignSelf:'flex-start', width: WIDTH-(IMAGE_SIZE+60),justifyContent:'space-around' ,height:IMAGE_SIZE-20}}>
                <View>
                    <Text regular size={18} style={{width:'75%'}} numberOfLines={2} adjustsFontSizeToFit>{data.name}</Text>
                    <Text size={20}>₹ {data.price}</Text>
                </View>
                <Pressable onPress={()=>setClose(item)} style={{position:'absolute', right:5, top:5}}>
                    <AntDesign name="close" size={24} color={color.white}/>
                </Pressable>
                <RowView style={{height:60}}>
                    <Pressable onPress={()=>setCount(count+1)} style={styles.button}><AntDesign name="plus" size={24} color={color.white} /></Pressable>
                    <TextInput style={{color:color.white,textAlign:'center',height:60,fontFamily:'Montserrat' ,width:80,padding:5, fontSize:20}} value={count.toString()} keyboardType='decimal-pad' onChangeText={(e)=>{e>=1 && setCount(parseInt(e))}}/>
                    <Pressable onPress={()=>count>1 && setCount(count-1)} style={styles.button}><AntDesign name="minus" size={24} color={color.white} /></Pressable>
                </RowView>
            </View>
        </RowView>
        </Pressable>
}

const Index = () => {
    const [sheet, setSheet] = useState(false)
    const [data, setData] = useState([])
    const [map, setMap] = useState([])
    const serviceData = (id)=>{
        const result = data.map(item=>{
            return item.Providers.services.map(service=>{
                return service.id === id && service
            })
        })[0]
        return result!==undefined ? result.filter(item=>item)[0] : {}
    }
    const CheckoutList = ()=>{
        var list = []
        var total = 0
        map.map(item=>{
            var servicesData = serviceData(item.Service_Id)
            list = [...list, {name:servicesData.name, price:servicesData.price, Quantity:item.Quantity}]
            total = (total + servicesData.price*item.Quantity)
        })
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return [list, total]
    }
    const [list, total] = CheckoutList()
    const setClose = async (item)=>{
        var result = JSON.parse(await AsyncStorage.getItem('CART'))
        const filter = result.filter(data=>data.Service_Id!== item.Service_Id)
        await AsyncStorage.setItem('CART', JSON.stringify(filter))
        setMap(filter)
    }

    const quantiyEdit = async (Quantity, service)=>{
        const result = {...service, Quantity}
        var links = []
        map.map(item=>{
            item.Service_Id===service.Service_Id ?
                links = [...links, result]
            :
                links = [...links, item]
        })
        await AsyncStorage.setItem('CART', JSON.stringify(links))
        setMap(links)
    }

    const checkOut = ()=>{
        map.map(async item=>{
            const service = serviceData(item.Service_Id)
            var id = `ORD-${Math.floor(Math.random()*1000000)}`
            const order = {
                ...item,
                id,
                orderAt: moment(new Date()).format('LLL'),
                service,
            }
            console.log('trigger', id)
            await uploadOrder(order).then(()=>alert('sucess'))
            await AsyncStorage.removeItem('CART')
            setMap([])
        })
    }
    
    useEffect(()=>{
        const getData = async ()=>{
            var list = JSON.parse(await AsyncStorage.getItem('CART'))
            list = list!==null ? list : []
            setMap(list)
            list.map(async ({Provider_Id})=>{
                if (data.filter(item=>item.id!== Provider_Id && true)){
                        await getProviderById(Provider_Id).then(response=>{
                            setData([...data, response.data[0]])
                        })
                }
            })
        }
        getData()
    },[])
    return (
        <CartView>
            <View style={{padding:20}}>
                <Text bold size={30}>Linkups</Text>
                <Text>Bag</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20, marginBottom:HEIGHT*.3}}>
                    {
                        map.map((item)=><CartListView key={item.Service_Id} setClose={setClose} data={serviceData(item.Service_Id)} item={item} Quantity={item.Quantity} quantiyEdit = {quantiyEdit}/>)
                    }
                </ScrollView>
            </View>
            <BottomSheet snapPoints={[HEIGHT*.2,HEIGHT*.5]} onChange={()=>setSheet(!sheet)}>
                <View style={{padding:20, height:HEIGHT*.5}}>
                {!sheet ?<RowView style={{justifyContent:'space-between'}}>
                        <View>
                            <Text>Total</Text>
                            <Text size={30} regular>₹ {total}</Text>
                        </View>
                        <Pressable onPress={checkOut}>
                            <RowView style={{backgroundColor:color.active, padding:10, borderRadius:100, width:150, justifyContent:'space-between'}}>
                                <Text regular>Checkout</Text>
                                <AntDesign name="arrowright" size={24} color={color.white} />
                            </RowView>
                        </Pressable>
                    </RowView>
                :
                <View style={{flex:1, marginBottom:HEIGHT*.08}}>
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginBottom:HEIGHT*.15}}>
                            <RowView style={{justifyContent:'space-between', marginBottom:10}}>
                                <Text style={styles.table} regular >Service</Text>
                                <Text style={styles.table} regular >Quantity</Text>
                                <Text style={styles.table} regular >Price</Text>
                            </RowView>
                            {
                                list.map(item=><RowView key={Math.random().toString()} style={{justifyContent:'space-between'}}>
                                <Text style={styles.table}>{item.name}</Text>
                                <Text style={styles.table}>{item.Quantity}</Text>
                                <Text style={styles.table}>₹ {item.price*item.Quantity}</Text>
                            </RowView>)   
                            }
                            <RowView style={{alignSelf:'flex-end', marginRight:20, marginTop:20, alignItems:'flex-end'}}>
                                <Text regular>Total:</Text>
                                <Text regular size={25}> ₹ {total}</Text>
                            </RowView>
                        </View>
                    </BottomSheetScrollView>
                    <Pressable onPress={checkOut} style={{position:'absolute', bottom:10, alignSelf:'flex-end'}}>
                        <RowView style={{backgroundColor:color.active, padding:10, borderRadius:100, width:150, justifyContent:'space-between'}}>
                            <Text regular>Checkout</Text>
                            <AntDesign name="arrowright" size={24} color={color.white} />
                        </RowView>
                    </Pressable>
                </View>
                }
                </View>
            </BottomSheet>
        </CartView>
    )
}

export default Index

const styles = StyleSheet.create({
    button:{
        backgroundColor:color.lightDark,
        padding:5,
        borderRadius:100
    },
    table:{
        width:(WIDTH-40)/3,
        textAlign:'center'
    }
})
