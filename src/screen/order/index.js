import React, {useState} from 'react'
import { StyleSheet, View, Dimensions, FlatList, ScrollView, Image, Pressable, TextInput } from 'react-native'

import BottomBar from 'components/BottomBar'
import BottomSheet from 'components/BottomSheet'
import {BottomSheetScrollView} from '@gorhom/bottom-sheet'

import { AntDesign } from '@expo/vector-icons'; 

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

const CartListView = ()=>{
    const IMAGE_SIZE = 150
    const [count, setCount] = useState(1)
    const uri = "https://us.123rf.com/450wm/bialasiewicz/bialasiewicz1805/bialasiewicz180500624/101345144-decorative-mirror-and-modern-painting-hanging-on-the-wall-with-molding-in-dark-grey-living-room-inte.jpg?ver=6"
    return <RowView style={{backgroundColor:color.dark, opacity:0.7, height:IMAGE_SIZE, marginBottom:20, borderRadius:20, overflow:'hidden'}}>
        <Image source={{uri}} style={{height:IMAGE_SIZE, width:IMAGE_SIZE, borderRadius:20}}/>
        <View style={{margin:10, alignSelf:'flex-start', width: WIDTH-(IMAGE_SIZE+60),justifyContent:'space-around' ,height:IMAGE_SIZE-20}}>
            <RowView style={{justifyContent:'space-between', alignItems:'flex-start'}}>
                <View>
                    <Text regular size={20}>Micke Sofa</Text>
                    <Text size={20}>₹ 55,000</Text>
                </View>
                <AntDesign name="close" size={24} color={color.white} />
            </RowView>
            <RowView style={{height:60}}>
                <Pressable onPress={()=>setCount(count+1)} style={styles.button}><AntDesign name="plus" size={24} color={color.white} /></Pressable>
                <TextInput style={{color:color.white,textAlign:'center',height:60,fontFamily:'Montserrat' ,width:80,padding:5, fontSize:20}} value={count.toString()} keyboardType='decimal-pad' onChangeText={(e)=>{e>=1 && setCount(parseInt(e))}}/>
                <Pressable onPress={()=>count>1 && setCount(count-1)} style={styles.button}><AntDesign name="minus" size={24} color={color.white} /></Pressable>
            </RowView>
        </View>
    </RowView>
}

const Index = () => {
    const [sheet, setSheet] = useState(false)
    return (
        <CartView>
            <View style={{padding:20}}>
                <Text bold size={30}>Linkups</Text>
                <Text>Bag</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20, marginBottom:HEIGHT*.3}}>
                    <CartListView/>
                    <CartListView/>
                    <CartListView/>
                    <CartListView/>
                </ScrollView>
            </View>
            <BottomSheet snapPoints={[HEIGHT*.2,HEIGHT*.5]} onChange={()=>setSheet(!sheet)}>
                <View style={{padding:20, height:HEIGHT*.5}}>
                {!sheet ?<RowView style={{justifyContent:'space-between'}}>
                        <View>
                            <Text>Total</Text>
                            <Text size={30} regular>₹ 55,000</Text>
                        </View>
                        <View>
                            <RowView style={{backgroundColor:color.active, padding:10, borderRadius:100, width:150, justifyContent:'space-between'}}>
                                <Text regular>Checkout</Text>
                                <AntDesign name="arrowright" size={24} color={color.white} />
                            </RowView>
                        </View>
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
                            <RowView style={{justifyContent:'space-between'}}>
                                <Text style={styles.table}>Micke Sofa</Text>
                                <Text style={styles.table}>1</Text>
                                <Text style={styles.table}>₹ 55,000</Text>
                            </RowView>
                            <RowView style={{alignSelf:'flex-end', marginRight:20, marginTop:20, alignItems:'flex-end'}}>
                                <Text regular>Total:</Text>
                                <Text regular size={25}> ₹ 55,000</Text>
                            </RowView>
                        </View>
                    </BottomSheetScrollView>
                    <View style={{position:'absolute', bottom:10, alignSelf:'flex-end'}}>
                        <RowView style={{backgroundColor:color.active, padding:10, borderRadius:100, width:150, justifyContent:'space-between'}}>
                            <Text regular>Checkout</Text>
                            <AntDesign name="arrowright" size={24} color={color.white} />
                        </RowView>
                    </View>
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
