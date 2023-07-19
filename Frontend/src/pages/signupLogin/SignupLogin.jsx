import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Add from '../../hooks/users/Add'
import Data from '../../hooks/users/data'
import './signupLogin.scss'

function SignupLogin() {

  const [userDataSignup, setUserDataSignup] = useState({
    nameLastname: '',
    username: '',
    password: '',
    email: '',
    profile: '',
  })

  const [userDataLogin, setUserDataLogin] = useState({
    email: '',
    password: ''
  })

  const [isLoginFormVisible, setLoginFormVisible] = useState(false)
  const [spanSignup, setSpanSignup] = useState({ display: 'none' })
  const [spanLogin, setSpanLogin] = useState({ display: 'unset' })
  const [signupClick, setSignupClick] = useState(false)
  const [loginClick, setLoginClick] = useState(false)

  useEffect(() => {
    document.title = 'Cannys Clone | Signup'

    const currentPath = window.location.pathname

    if (currentPath === '/signup') {
      handleSignUpTextClick()
    } else {
      handleLogInTextClick()
    }
  }, [])

  const handleSignUpTextClick = () => {
    setLoginFormVisible(false)
    setSpanSignup({ display: 'none' })
    setSpanLogin({ display: 'unset' })
    document.title = 'Cannys Clone | Signup'
  }

  const handleLogInTextClick = () => {
    setLoginFormVisible(true)
    setSpanSignup({ display: 'unset' })
    setSpanLogin({ display: 'none' })
    document.title = 'Cannys Clone | Login'
  }

  const handleInputChangeSignup = (event) => {
    const { name, value } = event.target
    setUserDataSignup((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const handleInputChangeLogin = (event) => {
    const { name, value } = event.target
    setUserDataLogin((data) => ({
      ...data,
      [name]: value,
    }))
  }

  // Check Email
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  let checkEmail = false
  const handleSignUpClick = () => {

      if (
        userDataSignup.nameLastname.trim() &&
        userDataSignup.username.trim() &&
        userDataSignup.password.trim() &&
        userDataSignup.email.trim() &&
        userDataSignup.profile.trim()
        ) 
        {
          if (validateEmail(userDataSignup.email)) {
            checkEmail = false
          }else{
            checkEmail = true
            toast.warn('The email is incorrect', {
              className: 'custom-toast',
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          })
          }
          if (!checkEmail) {
          setSignupClick(true) 
          }
        }
        else{
          toast.warn('Fill in the information completely', {
            className: 'custom-toast',
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }    
  }
      
  const handleLogInClick = () => {

    if (
      userDataLogin.email.trim() &&
      userDataLogin.password.trim() 
      ) 
      {
        if (validateEmail(userDataLogin.email)) {
          checkEmail = false
        }else{
          checkEmail = true
          toast.warn('The email is incorrect', {
            className: 'custom-toast',
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        }
       if (!checkEmail) {
         setLoginClick(true) 
        } 

      }
      else{
        toast.warn('Fill in the information completely', {
          className: 'custom-toast',
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
  }

  return (
    <>
      <div className="form-structor">

        {/* Signup Form */}
        <div className={`signup ${isLoginFormVisible ? 'slide-up' : ''}`}>
          <Link className="change-url" to="/signup">
            <h2 onClick={handleSignUpTextClick} className="form-title" id="signup">
              <span className="span-or" style={spanSignup}>
                or
              </span>
              Signup
            </h2>
          </Link>
          <div className="form-holder">
            <input
              type="text"
              name="nameLastname"
              className="input"
              placeholder="First name and Last name"
              value={userDataSignup.nameLastname}
              onChange={handleInputChangeSignup}
              required
            />
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              value={userDataSignup.username}
              onChange={handleInputChangeSignup}
              required
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={userDataSignup.password}
              onChange={handleInputChangeSignup}
              required
            />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={userDataSignup.email}
              onChange={handleInputChangeSignup}
              required
            />
            <input
              type="text"
              name="profile"
              className="input"
              placeholder="Profile photo link"
              value={userDataSignup.profile}
              onChange={handleInputChangeSignup}
              required
            />
          </div>
          <button className="submit-btn" onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>

        {/* Login Form */}
        <div className={`login ${isLoginFormVisible ? '' : 'slide-up'}`}>
          <div className="center">
            <Link className="change-url" to="/login">
              <h2 onClick={handleLogInTextClick} className="form-title" id="login">
                <span className="span-or" style={spanLogin}>
                  or
                </span>
                <span style={{ color: '#3e46cd' }}>Login</span>
              </h2>
            </Link>
            <div className="form-holder">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={userDataLogin.email}
              onChange={handleInputChangeLogin}
              required
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={userDataLogin.password}
              onChange={handleInputChangeLogin}
              required
            />
            </div>
            <button className="submit-btn" onClick={handleLogInClick}>
              Log in
            </button>
          </div>
        </div>

      </div>
      <ToastContainer />
      <Add 
      userDataSignup={userDataSignup} 
      signupClick={signupClick} 
      setSignupClick={setSignupClick} 
      setUserDataSignup={setUserDataSignup}
      handleLogInTextClick={handleLogInTextClick}
      />
      <Data
      loginClick={loginClick} 
      setLoginClick={setLoginClick}
      userDataLogin={userDataLogin} 
      setUserDataLogin={setUserDataLogin}
      />
    </>
  )
}

export default SignupLogin
