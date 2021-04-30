import React, {useState} from 'react'
import { StyleSheet, Dimensions, View, FlatList, Pressable } from 'react-native'

import { Feather } from '@expo/vector-icons'; 

import {Text, RowView} from 'styles'
import color from 'colors'

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

const Category = ()=>{
    const CATEGORY_SIZE = 90
    const [active, setActive] = useState(false)
    return <View>
        <Pressable onPress={()=>setActive(active=>!active)} style={{
            backgroundColor:active? color.active: color.lightDark, 
            width:CATEGORY_SIZE, 
            height:CATEGORY_SIZE, 
            borderRadius:20, 
            marginHorizontal:10, 
            justifyContent:'center', 
            alignItems:'center'}}>
                <Text>Dhruv</Text>
        </Pressable>
        {active && <View style={{backgroundColor:color.active, padding:5,borderRadius:100, alignSelf:'center', margin:10}}/>}
    </View>

}

const Index = () => {
    return (
        <View>
            {/* Header */}
                <RowView style={{justifyContent:'space-between', margin:20}}>
                    <Text size={30} bold>Linkups</Text>
                    <View style={styles.Input}>
                        <Feather name="search" size={27} color={color.white} style={{marginRight:5}} />
                    </View>
                </RowView>
             {/* Header End*/}

            {/* Category */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{marginTop:HEIGHT*.02}}
                    data={[1,2,3,4,5,6,7]}
                    keyExtractor={()=>Math.random().toString()}
                    renderItem = {()=><Category/>}
                />
            {/* Category End*/}

        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    Input:{
        backgroundColor:color.lightDark, 
        width:WIDTH*.25, 
        borderRadius:100, 
        alignItems:'flex-end', 
        height:40,
        justifyContent:'center',
        opacity:0.7
    }
})
