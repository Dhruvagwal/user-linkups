import React, {useContext, useState} from 'react'

const Context = React.createContext()

// const INITIAL_STATE = {auth:false}

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState(false)
    return <Context.Provider value={{auth, setAuth}}>
        {children}
    </Context.Provider>
}

const AuthConsumer = ()=>{
    return useContext(Context)
}

export {AuthProvider, AuthConsumer}