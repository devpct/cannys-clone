import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { UsersDataContext } from '../../context/home/HomeContext'
import 'react-toastify/dist/ReactToastify.css'
import Add from '../../hooks/users/Add'
import Data from '../../hooks/users/Data'
import './signupLogin.scss'

function SignupLogin() {

  const [userData, setUserData] = useState(null)

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
  const [usersData, setUsersData] = useContext(UsersDataContext)
  const [betUserData, setBetUserData] = useState(false)
  const [forgetPasswordClick, setForgetPasswordClick] = useState({bet: false , email: ''})
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''))
  const [moadelVerifyCode, setMoadelVerifyCode] = useState({ display: 'none'})
  const [loginVerifyCode, setLoginVerifyCode] = useState(false)

  const LoginPage = useNavigate()

  useEffect(() => {
    const currentPath = window.location.pathname
    document.body.style.backgroundColor = '#E1E8EE';
    if (currentPath === '/signup') {
      document.title = 'Cannys Clone | Signup'
      handleSignUpTextClick()
    } else {
      handleLogInTextClick()
    }
    setBetUserData(true)
  }, [])

  const handleSignUpTextClick = () => {
    setBetUserData(true)
    setLoginFormVisible(false)
    setSpanSignup({ display: 'none' })
    setSpanLogin({ display: 'unset' })
    document.title = 'Cannys Clone | Signup'
  }

  const handleLogInTextClick = () => {
    setBetUserData(true)
    setLoginFormVisible(true)
    setSpanSignup({ display: 'unset' })
    setSpanLogin({ display: 'none' })
    document.title = 'Cannys Clone | Login'
    LoginPage('/login')
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
  
  const handleSignUpClick = () => {

      if (
        userDataSignup.nameLastname.trim() &&
        userDataSignup.username.trim() &&
        userDataSignup.password.trim() &&
        userDataSignup.email.trim()
        ) 
        { 
          const isUsernameExist = usersData.some(user => user.username === userDataSignup.username)
          const isEmailExist = usersData.some(user => user.email === userDataSignup.email)
          if (isUsernameExist) {
            toast.warn('Username is already used', {
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
          else if (isEmailExist) {
              toast.warn('Email already used', {
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
          }else{
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
         setLoginClick(true) 
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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const index = Number(name.substring(1))

    setVerificationCode((prevVerificationCode) => {
      const newVerificationCode = [...prevVerificationCode]
      newVerificationCode[index - 1] = value
      return newVerificationCode
    })
  }

  const forgotPass = email =>{
      if (email === '') {
        toast.warn('Email is empty', {
          className: 'custom-toast',
          position: "bottom-center",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }else{
        toast.success('The code was sent to your email', {
          className: 'custom-toast',
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setForgetPasswordClick({ bet: true, email})
        setMoadelVerifyCode({display: 'block'})
      }
    }

  const handleSubmit = () => {
    event.preventDefault()
        const code = verificationCode.join('')
        if (forgetPasswordClick.codeVerify === code) {
          setLoginVerifyCode(true)
        }else{
          toast.warn('Code is wrong', {
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
              maxLength={8}
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
              placeholder="Profile photo link (Optional)"
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
              maxLength={8}
              className="input"
              placeholder="Password"
              value={userDataLogin.password}
              onChange={handleInputChangeLogin}
              required
            />
            </div>
            <p onClick={()=>forgotPass(userDataLogin.email)} className='forgot-password'>Forgot your password? Retrieve by email</p>
            <button className="submit-btn" onClick={handleLogInClick}>
              Log in
            </button>
          </div>
        </div>


      </div>

      <div style={{ display: moadelVerifyCode.display }} className="email-code-verification">
        <h1>Email Code Verification</h1>
      <form name="verifyForm" onSubmit={handleSubmit}>
        <div className="inputs">
          {verificationCode.map((value, index) => (
            <input
              key={index}
              type="text"
              name={`n${index + 1}`}
              maxLength="1"
              value={value}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <button type="submit">Verify code</button>
      </form>
    </div>
      
      <ToastContainer />
      <Data
      loginClick={loginClick} 
      setLoginClick={setLoginClick}
      userDataLogin={userDataLogin} 
      setUserDataLogin={setUserDataLogin}
      betUserData={betUserData}
      setUserData={setUserData}
      loginVerifyCode={loginVerifyCode}
      setLoginVerifyCode={setLoginVerifyCode}
      />
      <Add 
      userDataSignup={userDataSignup} 
      signupClick={signupClick} 
      setSignupClick={setSignupClick} 
      setUserDataSignup={setUserDataSignup}
      handleLogInTextClick={handleLogInTextClick}
      forgetPasswordClick={forgetPasswordClick}
      setForgetPasswordClick={setForgetPasswordClick}
      />
    </>
  )
}

export default SignupLogin
