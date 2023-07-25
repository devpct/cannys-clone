import React, { useEffect } from 'react'
import axios from 'axios'

function Add({ addLike, setAddLike }) {

    useEffect(()=>{
        if (addLike !== '') {            
            axios.post('http://localhost:3000/add/like', {
                userId: addLike.userId,
                feedbackId: addLike.feedbackId,
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            setAddLike('')
        }
    },[addLike])

}

export default Add