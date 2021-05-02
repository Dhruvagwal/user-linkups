import React, {useState} from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

import color from 'colors'
import {Text} from 'styles'

import BottomSheet,{BottomSheetScrollView} from '@gorhom/bottom-sheet'
import { onChange } from 'react-native-reanimated'

const WIDTH = Dimensions.get('screen').width

const Sheet = ({children, snapPoints, onChange}) => {
    return (
        <BottomSheet
            initialSnapIndex ={0}
            onChange={onChange}
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            handleComponent={()=><View style={{padding:20, alignItems:'center'}}>
                <Text size={12}>Pull me</Text>
            </View>}
            backgroundComponent={() =>
                        <View style={styles.contentContainer}/>
            }
        >
        {children}
        </BottomSheet>
    )
}

export default Sheet

const styles = StyleSheet.create({
    contentContainer: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: color.elevatedDark,
        width:WIDTH
  },
})
