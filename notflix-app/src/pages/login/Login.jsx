import './login.scss'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/authContext'
import logo from '../../components/navbar/logo.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {dispatch, error} = useContext(AuthContext)

    const handleClick = async (e) => {
        e.preventDefault()
        await login({email, password}, dispatch)
    }

    const handleGuestClick = async (e) => {
        e.preventDefault()
        await login({email: process.env.REACT_APP_GUEST_NAME, password: process.env.REACT_APP_GUEST_PASSWORD}, dispatch)
    }

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo" 
                        src={logo} 
                        alt="Logo" 
                    />
                    <Link to='/register' style={{textDecoration: 'none'}}><button className="registerButton">Sign Up</button></Link>
                </div>
            </div>
            <div className="container">
                <form>
                    {error && <p className="error">Make sure you entered the correct email and password. If you are visiting, consider signing in as a guest.</p>}
                    <h1>Sign In</h1>
                    <button onClick={handleGuestClick}>Sign In as Guest</button>
                    <p>Or sign in to your personal account:</p>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleClick}>Sign In</button>
                    <span>New to Netflix? <Link to='/register' style={{textDecoration: 'none'}}><b>Sign Up</b></Link></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login
