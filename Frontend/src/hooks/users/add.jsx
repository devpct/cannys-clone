import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Add({ userData, signupClick, setUserData, setSignupClick }) {
  useEffect(() => {
    if (signupClick === true) {
      setSignupClick(false)
      axios.post('http://localhost:3000/add/user', { 
          nameLastname: userData.nameLastname,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          image: userData.profile
      })
      .then(response => {
          toast.success('Registration was successful', {
              position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        setTimeout(() => {
            setUserData({
                nameLastname: '',
                username: '',
                password: '',
                email: '',
                profile: '',
            })
        },100);
      })
      .catch(error => {
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
      })


    }

  }, [userData, signupClick, setUserData])

  return (
    <ToastContainer />
  )
}

export default Add
