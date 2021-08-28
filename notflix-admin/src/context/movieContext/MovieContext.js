//Context that gets passwed down to the rest of the application
import MovieReducer from './MovieReducer'
import { createContext, useReducer } from 'react'

//Set initial state
const INITIAL_STATE = {
    movies: [],
    isFetching: false,
    error: false
}

export const MovieContext = createContext(INITIAL_STATE)

export const MovieContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE)

    return (
        <MovieContext.Provider 
            value={{
                movies: state.movies, 
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}