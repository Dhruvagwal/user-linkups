import React, {useContext, useEffect, useReducer} from 'react'

import CONSTANT from 'navigation/navigationConstant'

import CONTEXT from './CONTEXT.json'

import {getUsersDetails, getCategory} from 'hooks/useData'

const Context = React.createContext()

const INITIAL_STATE = {currentRouteName: CONSTANT.Home, profile:{}, category:{}}

const reducer = (state, action)=>{
    switch (action.type){
        case CONTEXT.SET_NAME:
            return {...state, currentRouteName: action.currentRouteName}
        case CONTEXT.UPDATE:
            return {...state, profile:action.profile}
        case CONTEXT.CATP:
            return {...state, category:action.category}
        default:
            return state
    }
}

const DataProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    
    const setName = (currentRouteName)=>{
        dispatch({type:CONTEXT.SET_NAME, currentRouteName})
    }

    const Update = async ()=>{
        const {data}= await getUsersDetails()
        dispatch({type:CONTEXT.UPDATE, profile:data})
    }

    const Category = async ()=>{
        const {data} = await getCategory()
        dispatch({type:CONTEXT.CATP, category:data})
    }

    useEffect(()=>{
        Update()
    },[])


    return <Context.Provider value={{state, setName, Update, Category}}>
        {children}
    </Context.Provider>
}

const DataConsumer = ()=>{
    return useContext(Context)
}

export {DataProvider, DataConsumer}