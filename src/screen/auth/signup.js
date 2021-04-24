import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'

import styles from './css'

const SignUp = ({navigation}) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.Form}>
                <TextInput style={styles.TextInput} placeholder='Email Id'/>
                <TextInput style={styles.TextInput} placeholder='New Password'/>
                <TextInput style={styles.TextInput} placeholder='Confirm Password'/>
                <Text>{'\n'}</Text>
                <Button style={styles.SubmitButton} title='Submit'/>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{marginTop:25}}>
                    <Text style={styles.SignUp}>Have An Account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp
