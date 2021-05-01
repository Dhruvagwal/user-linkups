import React, { Children } from 'react'
import { StyleSheet, View, Dimensions, FlatList, ScrollView } from 'react-native'

import BottomBar from 'components/BottomBar'
import BottomSheet from 'components/BottomSheet'

import {Text, RowView} from 'styles'
import color from 'colors'

const HEIGHT = Dimensions.get('screen').height

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
    return <View>
        <Text>Dhurv</Text>
    </View>
}

const Index = () => {
    return (
        <CartView>
            <View style={{padding:20}}>
                <Text bold size={30}>Linkups</Text>
                <Text>Cart</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}}>
                    <CartListView/>
                </ScrollView>
            </View>
            <BottomSheet snapPoints={[HEIGHT*.2,HEIGHT*.5]}>
                <View style={{padding:20}}>
                    <Text>Dhruv</Text>
                </View>
            </BottomSheet>
        </CartView>
    )
}

export default Index

const styles = StyleSheet.create({})
