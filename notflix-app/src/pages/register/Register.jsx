import './register.scss'
import { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../../components/navbar/logo.png'
import { AuthContext } from '../../authContext/authContext'
import { login } from '../../authContext/apiCalls'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [existingAccount, setExistingAccount] = useState(false)

    const {dispatch, error} = useContext(AuthContext)

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleStartClick = () => {

        //Verify that email is valid, then setEmail if so
        const emailRegex = /\S+@\S+\.\S+/

        const valid = emailRef.current.value.match(emailRegex)
        if (valid)
            setEmail(emailRef.current.value)
        else   
            setEmail(-1)
    }

    const handlePasswordClick = async (e) => {
        e.preventDefault()
        if (!passwordRef.current.value) {
            setPassword(-1)
            return
        }
        setPassword(passwordRef.current.value)
        try {
            const password = passwordRef.current.value
            await axios.post(`${process.env.REACT_APP_PROXY}auth/register`, {email, password, username: email})
            login({email, password}, dispatch)
        }
        catch (err) {
            setExistingAccount(true)
        }
    }

    const handleGuestClick = async (e) => {
        e.preventDefault()
        await login({email: process.env.REACT_APP_GUEST_NAME, password: process.env.REACT_APP_GUEST_PASSWORD}, dispatch)
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img 
                        className="logo" 
                        src={logo} 
                        alt="Logo" 
                    />
                    <Link to='/login' style={{textDecoration: 'none'}}><button className="loginButton">Sign In</button></Link>
                </div>
            </div>
            <div className="container">
                {existingAccount && <p className="error">That account already exists. Please use another one.</p>}
                {error && <p className="error">The login failed. We may be having some server problems. Please try again later.</p>}
                {email === -1 && <p className="error">Please enter a valid email address.</p>}
                {password === -1 && <p className="error">Please enter a a password before registering.</p>}
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                {
                    (!email || email === -1) ? (
                        <div className="input">
                            <input type="email" placeholder="Enter your email" ref={emailRef} />
                            <button className="registerButton" onClick={handleStartClick}>Get Started</button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="password" placeholder="Enter your password" ref={passwordRef} />
                            <button className="registerButton" onClick={handlePasswordClick}>Sign Up</button>
                        </form>
                    )
                }
                <h2 className="visiting">Just visiting? Sign In as a Guest</h2>
                <button className="guestSignIn" onClick={handleGuestClick}>Sign In as Guest</button>
            </div>
        </div>
    )
}

export default Register
