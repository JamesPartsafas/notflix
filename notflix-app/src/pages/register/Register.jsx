import './register.scss'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import logo from '../../components/navbar/logo.png'

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useHistory()

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleStartClick = () => {
        setEmail(emailRef.current.value)
    }

    const handlePasswordClick = async (e) => {
        e.preventDefault()
        setPassword(passwordRef.current.value)
        try {
            await axios.post('auth/register', {email, password, username: email})
            history.push('/login')
        }
        catch (err) {
            console.log(err)
        }
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
                    <button className="loginButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Watch unlimited movies and TV shows</h1>
                <h2>Anywhere, anytime.</h2>
                <p>
                    Ready to watch? Enter your email and a password to start your membership.
                </p>
                {
                    !email ? (
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
            </div>
        </div>
    )
}

export default Register
