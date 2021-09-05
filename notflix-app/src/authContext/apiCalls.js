import axios from 'axios'
import { loginStart, loginFailure, loginSuccess, logout } from './AuthActions'

export const login = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${process.env.REACT_APP_PROXY}auth/login`, user)
        dispatch(loginSuccess(res.data))
    }
    catch (err) {
        dispatch(loginFailure())
    }
}

export const logoutHandler = (user, dispatch) => {
    dispatch(logout())
}