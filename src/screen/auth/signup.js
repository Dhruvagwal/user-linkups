import React, {useState} from 'react'
import { View, TextInput, Pressable, TouchableOpacity,ActivityIndicator } from 'react-native'
import {Text} from 'styles'
import color from 'colors'

import CONSTANT from '../../navigation/navigationConstant.json'

import {AuthConsumer} from '../../context/auth'


import {signUpWithPhoneNumber, confirmOTP, createAccount} from '../../hooks/useAuth'

import styles from './css'

const SignUp = ({navigation}) => {

    const {setAuth} = AuthConsumer()
    const [Name, setName] = useState(null)
    const [PhoneNumber, setPhoneNumber] = useState(null)
    
    const [Code, setCode] = useState(null)

    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const createUser = async ()=>{
        setLoading(true)
        const result = await signUpWithPhoneNumber(PhoneNumber)
        result?setConfirm(true):navigation.navigate(CONSTANT.Login)   
        setLoading(false)
    }

    const confirmOtp = async ()=>{
        const result = await confirmOTP(PhoneNumber, Code)
        const data = {
            Name, 
            PhoneNumber,
            isActive:result,
            isProvider: false
        }
        result && await createAccount(data)
        result?setAuth(true):setConfirm(false)        
    }
    if(confirm){
        return (
            <View style={styles.Container}>
                <Text style={styles.heading} regular>OTP</Text>
                <View style={styles.Form}>
                    <TextInput style={styles.TextInput} onChangeText={setCode} value={Code} keyboardType={'numeric'} placeholder='OTP'/>
                    <Pressable style={styles.SubmitButton} title='Submit'  onPress={()=>confirmOtp()}>
                        <Text>SUBMIT</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.Container}>
            <Text style={styles.heading} regular>Sign Up</Text>
            <View style={styles.Form}>
                <TextInput onChangeText={setName} value={Name} style={styles.TextInput} placeholder='Name' placeholderTextColor={color.inActive}/>
                <TextInput onChangeText={setPhoneNumber} value={PhoneNumber} style={styles.TextInput} keyboardType={'numeric'} placeholder='Phone Number' placeholderTextColor={color.inActive}/>
                <Text>{'\n'}</Text>
                {!loading ?<Pressable style={styles.SubmitButton} onPress={createUser}>
                    <Text regular>SUBMIT</Text>
                </Pressable>
                :<ActivityIndicator size="small" color="#0000ff" />}
                <TouchableOpacity onPress={()=>navigation.navigate(CONSTANT.Login)} style={{marginTop:25}}>
                    <Text style={styles.SignUp}>Have An Account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp
