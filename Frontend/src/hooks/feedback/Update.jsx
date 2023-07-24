import React, { useEffect } from 'react'
import axios from 'axios'

function Update({ numberLike, setNumberLike }) {
    useEffect(()=>{
        if (numberLike !== '') {
            console.log(numberLike) 
            axios.put(`http://localhost:3000/update/feedback/${numberLike.feedbackId}`, { 
                like: '' + numberLike.like,
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {         
                console.error(error.response.data.message)
            })
            setNumberLike('')
        }
    },[numberLike])
}

export default Update