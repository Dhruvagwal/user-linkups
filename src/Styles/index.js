import React, {useState} from 'react'
import {Text as RNText, View as RNView} from 'react-native'
import color from 'colors'

const Text = ({children, style, bold=false, size=15})=>{

    let font = 'Montserrat'

    if (bold) font=('Montserrat-Bold')

    return <RNText style={{color:color.white,fontSize:size, fontFamily:font, ...style}}>{children}</RNText>
}

const RowView = ({children, style})=><RNView style={{flexDirection:'row',alignItems:'center',...style}}>{children}</RNView>

export {Text, RowView}