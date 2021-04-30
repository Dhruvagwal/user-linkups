import React from 'react'
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'

const Loading = () => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator size='large' color='#000'/>
            <Text>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})
