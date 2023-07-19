import { useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate} from 'react-router-dom'
import md5 from 'md5'
import '../../pages/signupLogin/signupLogin.scss'

function Data({ loginClick, setLoginClick, userDataLogin, setUserDataLogin }) {

    const [usersData, setUserData] = useState()
    let warn = false

  const HomePage = useNavigate()

  // Users Data 
  useEffect(() => {
    axios.get('http://localhost:3000/data/users')
        .then(response => {
            setUserData(response.data)
        })  
        .catch(error => {
            console.error(error)
        })
  }, [userDataLogin])


  // Login
  useEffect(() => {
    if (loginClick === true) {

        const _0x19c184=_0x304f;function _0x304f(_0x891b74,_0x1b447a){const _0x4a77b7=_0x4a77();return _0x304f=function(_0x304f96,_0x3f0a92){_0x304f96=_0x304f96-0x1dc;let _0x15b2fc=_0x4a77b7[_0x304f96];return _0x15b2fc;},_0x304f(_0x891b74,_0x1b447a);}function _0x4a77(){const _0x17a556=['432688qnVpxl','password','1uibLYe','2807880bDGYsj','3914900WkMREt','9jZckDh','77536yjwSEV','231936teMSCR','21xefVhU','910805acaYVg','551860jkQQpP','18WpZslN'];_0x4a77=function(){return _0x17a556;};return _0x4a77();}(function(_0x56d97e,_0x2cbe7b){const _0x430753=_0x304f,_0x190ea5=_0x56d97e();while(!![]){try{const _0xdc2d6d=-parseInt(_0x430753(0x1de))/0x1*(parseInt(_0x430753(0x1e6))/0x2)+parseInt(_0x430753(0x1e7))/0x3*(parseInt(_0x430753(0x1e2))/0x4)+parseInt(_0x430753(0x1e5))/0x5+parseInt(_0x430753(0x1e3))/0x6+-parseInt(_0x430753(0x1e4))/0x7*(-parseInt(_0x430753(0x1dc))/0x8)+parseInt(_0x430753(0x1e1))/0x9*(parseInt(_0x430753(0x1df))/0xa)+-parseInt(_0x430753(0x1e0))/0xb;if(_0xdc2d6d===_0x2cbe7b)break;else _0x190ea5['push'](_0x190ea5['shift']());}catch(_0x461b34){_0x190ea5['push'](_0x190ea5['shift']());}}}(_0x4a77,0x24371));const hashedPassword=md5(userDataLogin[_0x19c184(0x1dd)])

        setLoginClick(false)
        usersData.filter((user) => {
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

                setTimeout(()=> {
                    HomePage('/')
                },3500)
                warn = true
            }
        })

        if (warn === false) {
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
  },[userDataLogin, loginClick, setUserDataLogin])
}
export default Data