import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UsersDataContext } from '../../context/home/HomeContext'
import md5 from 'md5'
import 'react-toastify/dist/ReactToastify.css'
import '../../pages/signupLogin/signupLogin.scss'

function Data({ loginClick, setLoginClick, userDataLogin, setUserData, userData, betUserData }) {
  const HomePage = useNavigate()

  const [usersData, setUsersData] = useContext(UsersDataContext)

  // Users Data 
  useEffect(() => {
    axios.get('http://localhost:3000/data/users')
      .then(response => {
        setUsersData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [userDataLogin])

  // Login
  useEffect(() => {
    if (loginClick === true) {
      const hashedPassword = md5(userDataLogin.password)

      setLoginClick(false)
      let warn = true

      usersData.forEach(user => {
        if (user.email === userDataLogin.email && user.password === hashedPassword) {
          localStorage.setItem('username', user.username)
          toast.success('Login was successful', {
            position: "bottom-center",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })

          setTimeout(() => {
            HomePage('/')
          }, 3500)

          warn = false
        }
      })

      if (warn) {
        toast.warn('The information entered is incorrect', {
          className: 'custom-toast',
          position: "bottom-center",
          autoClose: 3100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  }, [userDataLogin, loginClick])

  // User data page home 
  useEffect(() => {
      if (usersData.length  !== 0) { 
        const username = localStorage.getItem('username')
        if (username) {
          const userWithUsername = usersData.find(user => user.username === username)

        if (userWithUsername) {
          const imageUrl = userWithUsername.image === 'null'
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/480px-Default_pfp.svg.png'
            : userWithUsername.image;

          setUserData({ name: userWithUsername.nameLastname, username: userWithUsername.username, image: imageUrl })
        }
        }
      }
  }, [usersData])
  
}

export default Data
