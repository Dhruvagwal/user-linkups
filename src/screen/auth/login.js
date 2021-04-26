import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity,ActivityIndicator } from 'react-native'

import CONSTANT from '../../navigation/navigationConstant.json'

import {AuthConsumer} from '../../context/auth'


import {signInWithPhoneNumber, confirmOTP} from '../../hooks/useAuth'

import styles from './css'

const SignUp = ({navigation}) => {

    const {setAuth} = AuthConsumer()
    const [Name, setName] = useState(null)
    const [PhoneNumber, setPhoneNumber] = useState(null)

    const [Code, setCode] = useState(null)

    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const LoginUser = async ()=>{
        setLoading(true)
        const result = await signInWithPhoneNumber(PhoneNumber)
        result?setConfirm(true):navigation.navigate(CONSTANT.Login)   
        setLoading(false) 
    }

    const confirmOtp = async ()=>{
        const result = await confirmOTP(PhoneNumber, Code)
        result?setAuth(true):setConfirm(false)        
    }
    if(confirm){
        return (
            <View style={styles.Container}>
                <Text style={styles.heading}>OTP</Text>
                <View style={styles.Form}>
                    <TextInput style={styles.TextInput} onChangeText={setCode} value={Code} keyboardType={'numeric'} placeholder='OTP'/>
                    <Button style={styles.SubmitButton} title='Submit'  onPress={()=>confirmOtp()}/>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.Container}>
            <Text style={styles.heading}>Sign IN</Text>
            <View style={styles.Form}>
                <TextInput onChangeText={setPhoneNumber} value={PhoneNumber} style={styles.TextInput} keyboardType={'numeric'} placeholder='Phone Number'/>
                <Text>{'\n'}</Text>
                {!loading ?<Button style={styles.SubmitButton} title='Submit' onPress={LoginUser}/>
                :<ActivityIndicator size="small" color="#0000ff" />}
                <TouchableOpacity onPress={()=>navigation.navigate(CONSTANT.Login)} style={{marginTop:25}}>
                    <Text style={styles.SignUp}>Don't Have An Account? SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp
