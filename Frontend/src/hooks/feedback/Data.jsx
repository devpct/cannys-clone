import React, { useEffect } from 'react'
import axios from 'axios'

function Data({ setFeedbacks }) {

    useEffect(()=>{
        axios.get('http://localhost:3000/data/feedbacks')
        .then(response => {
            setFeedbacks(response.data.reverse())
        })
        .catch(error => {
          console.error(error)
        })
    },[])

}

export default Data