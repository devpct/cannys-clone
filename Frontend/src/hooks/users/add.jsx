import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Add({ userDataSignup, signupClick, setUserDataSignup, setSignupClick, handleLogInTextClick }) {
  
  const findQuotedWord = (text) => {
    const regex = /"(.*?)"/;
    const match = text.match(regex);
    if (match) {
      return match[1]
    } else {
      return ''
    }
  }

  useEffect(() => {
    if (signupClick === true) {
      if (userDataSignup.profile.length === 0) {
        setUserDataSignup(prevUserDataSignup => ({
          ...prevUserDataSignup,
          profile: 'null'
        }))
      }
      
      setSignupClick(false)
      axios.post('http://localhost:3000/add/user', {
        nameLastname: userDataSignup.nameLastname,
        username: userDataSignup.username,
        password: userDataSignup.password,
        email: userDataSignup.email,
        image: userDataSignup.profile
      })
        .then(response => {
          toast.success('Registration was successful', {
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
            setUserDataSignup({
              nameLastname: '',
              username: '',
              password: '',
              email: '',
              profile: '',
            })
            handleLogInTextClick()
          }, 1000)
        })
        .catch(error => {
          const errroMessage = error.response.data.message
          const quotedWord = findQuotedWord(errroMessage)
          console.log(error)
          if (quotedWord === 'nameLastname') {
            toast.warn('First and last name must be less than 50 letters', {
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
          else if (quotedWord === 'username') {
            toast.warn('Username must be less than 40 characters and more than 4 characters', {
              className: 'custom-toast',
              position: "bottom-left",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          }
          else if (quotedWord === 'password') {
            toast.warn('Password must be 8 characters long', {
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
          else if (quotedWord === 'email') {
            toast.warn('The email is incorrect', {
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
          else if (quotedWord === 'image') {
            toast.warn('The photo link must be less than 400 characters', {
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
          else{
            toast.error('Server problem, please try again', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          }
        })
    }

  }, [userDataSignup, signupClick, setUserDataSignup])
}

export default Add
