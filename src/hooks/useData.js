import instances from '../data/axios'

import { AsyncStorage } from 'react-native'
const STORAGE_KEY_3 = 'LINKUPS_USER_PHONE_NUMBER' 


const getServices = ()=>{
    return instances.get(`ReadAll/api/users/read`)
}

const getCategory = ()=>{
    return instances.get('ReadAll/api/CATP/read')
}

const getUsersDetails =async ()=>{
    const LINKUPS_USER_PHONE_NUMBER = await AsyncStorage.getItem(STORAGE_KEY_3)
    return instances.get(`/ReadId/api/users/${LINKUPS_USER_PHONE_NUMBER}`)
}

export {getServices, getUsersDetails, getCategory}
