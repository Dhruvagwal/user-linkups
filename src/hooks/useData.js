import instances from '../data/axios'

import { AsyncStorage } from 'react-native'
const STORAGE_KEY_3 = 'LINKUPS_USER_PHONE_NUMBER' 

const getCategory = ()=>{
    return instances.get('ReadAll/api/CATP/read')
}

const getProvidersByCategory=async (CatPID)=>{
    const {data} = await instances.post('/QuerySearch/api/users/search/',{
        isProvider : true
    })
    return data.filter((item)=>item.info.CatPID === CatPID && item)
}

const getProviderById = async (id)=>{
    return instances.post('/QuerySearch/api/users/search/',{
        isProvider : true,
        id
    })
}

const getUsersDetails =async ()=>{
    const LINKUPS_USER_PHONE_NUMBER = await AsyncStorage.getItem(STORAGE_KEY_3)
    return instances.get(`/ReadId/api/users/${LINKUPS_USER_PHONE_NUMBER}`)
}

export {getUsersDetails, getCategory, getProvidersByCategory, getProviderById}
