import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Add from '../../hooks/users/add'
import './signupLogin.scss'

function SignupLogin() {

  const [userData, setUserData] = useState({
    nameLastname: '',
    username: '',
    password: '',
    email: '',
    profile: '',
  })
  const [isLoginFormVisible, setLoginFormVisible] = useState(false)
  const [spanSignup, setSpanSignup] = useState({ display: 'none' })
  const [spanLogin, setSpanLogin] = useState({ display: 'unset' })
  const [signupClick, setSignupClick] = useState(false)

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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUserData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const handleSignUpClick = () => {
    if (
      userData.nameLastname.trim() &&
      userData.username.trim() &&
      userData.password.trim() &&
      userData.email.trim() &&
      userData.profile.trim()
    ) {
      setSignupClick(true)
    }
  }

  const handleLogInClick = () => {
    // Handle login click
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
              value={userData.nameLastname}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="profile"
              className="input"
              placeholder="Profile photo link"
              value={userData.profile}
              onChange={handleInputChange}
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
              <input type="email" className="input" placeholder="Email" />
              <input type="password" className="input" placeholder="Password" />
            </div>
            <button className="submit-btn" onClick={handleLogInClick}>
              Log in
            </button>
          </div>
        </div>

      </div>
      <Add userData={userData} signupClick={signupClick} setSignupClick={setSignupClick} setUserData={setUserData}/>
    </>
  )
}

export default SignupLogin
