import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import color from 'colors'

import BottomSheet,{BottomSheetScrollView} from '@gorhom/bottom-sheet'

const WIDTH = Dimensions.get('screen').width

const Sheet = ({children, snapPoints}) => {
    return (
        <BottomSheet
            initialSnapIndex ={0}
            snapPoints={snapPoints}
            handleComponent={()=><View style={{borderWidth:2,borderRadius:10, alignSelf:'center',borderColor:color.dark, margin:10, width:70}}/>}
            backgroundComponent={() =>
                        <View style={styles.contentContainer}/>
            }
        >
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                {children}
            </BottomSheetScrollView>
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
