    import { useEffect } from 'react'
    import axios from 'axios'

    function Add({ userData, signupClick }) {
    useEffect(() => {
        if (signupClick === true) {
            axios.post('http://localhost:3000/add/user', { 
                nameLastname: userData.nameLastname,
                username: userData.username,
                password: userData.password,
                email: userData.email,
                image: userData.profile
            })
            .then(response => {
                console.log(response)
                })
            .catch(error => {
                console.error(error)
            })
        }
    }, [userData, signupClick])
    }

    export default Add
