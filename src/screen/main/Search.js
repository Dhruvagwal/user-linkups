import React from 'react'
import { StyleSheet, View, Dimensions, TextInput, ScrollView} from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons'; 

import color from 'colors'
import {Text, RowView} from 'styles'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const Search = () => {
    return (
        <View style={{flex:1, backgroundColor:color.dark}}>
            <View style={{height:HEIGHT*.1}}/>
            <View style={{flex:1}}>
                <RowView style={{backgroundColor:color.lightDark,borderRadius:100,justifyContent: 'space-between', alignSelf: 'center',}}>
                    <TextInput placeholder='Search' placeholderTextColor={color.inActive} style={styles.TextInput}/>
                    <FontAwesome5 name="microphone" size={24} color={color.active} style={{marginRight:20}} />
                </RowView>
                <View style={{marginTop:20, flex:1}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{marginBottom:20, margin:20}}>Search History</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    TextInput:{   
        padding:10,
        paddingHorizontal:20,
        fontSize:20,
        color:color.white,
        width:'85%'
    },
})
