//Passes context to other components related to authentication
import AuthReducer from './AuthReducer'
import { createContext, useReducer, useEffect, useContext } from 'react'

//Set initial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)
const AuthStateContext = createContext()

//useAuthState is a custom hook that returns the current state of the user's login
export function useAuthState() {
    return useContext(AuthStateContext)
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    function getAuthState() {
        return state
    }

    return (
        <AuthContext.Provider 
            value={{
                user: state.user, 
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
            useAuthState={useAuthState}
        >
            <AuthStateContext.Provider value={getAuthState}>
                {children}
            </AuthStateContext.Provider>
        </AuthContext.Provider>
    )
}