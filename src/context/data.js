import React, {useContext, useState, useReducer} from 'react'

import CONSTANT from 'navigation/navigationConstant'

import CONTEXT from './CONTEXT.json'

const Context = React.createContext()

const INITIAL_STATE = {currentRouteName: CONSTANT.Home}

const reducer = (state, action)=>{
    switch (action.type){
        case CONTEXT.SET_NAME:
            return {currentRouteName: action.currentRouteName}
        default:
            return state
    }
}

const DataProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const setName = (currentRouteName)=>{
        dispatch({type:CONTEXT.SET_NAME, currentRouteName})
    }


    return <Context.Provider value={{state, setName}}>
        {children}
    </Context.Provider>
}

const DataConsumer = ()=>{
    return useContext(Context)
}

export {DataProvider, DataConsumer}